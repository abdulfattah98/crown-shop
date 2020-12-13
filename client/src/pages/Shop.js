import React, { useState, useEffect } from 'react';
import {
    getProductsByCount,
    fetchProductsByFilter,
} from '../functions/product';

import { Link, useLocation } from 'react-router-dom';
import LoadingCard from '../components/cards/LoadingCard';
import { getCategories } from '../functions/category';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import ProductCardRow from '../components/cards/ProductCardRow';

import Star from '../components/forms/Star';

import { ReactComponent as FilterIcon } from './filter.svg';
import { ReactComponent as ListIcon } from './list.svg';
import { ReactComponent as GridIcon } from './grid.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as NotFoundIcon } from './notfound.svg';

const { SubMenu } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [view, setView] = useState('grid');
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState([1, 9000]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState(null);
    // const [subs, setSubs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [brands, setBrands] = useState([
        'Apple',
        'Samsung',
        'Microsoft',
        'Lenovo',
        'ASUS',
    ]);
    // eslint-disable-next-line no-unused-vars
    const [colors, setColors] = useState([
        'Black',
        'Brown',
        'Silver',
        'White',
        'Blue',
    ]);
    const [allowPrice, setallowPrice] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [waitForFilter, setwaitForFilter] = useState(false);
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('');

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    let { text } = search;

    useEffect(() => {
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        // getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts([...res.data]);
            //console.log(products);
            if (text) {
                setLoading(false);
            }
            setwaitForFilter(false);
        });
    };

    // useEffect(() => {
    //     console.log(products);
    // }, [products]);

    useEffect(() => {
        if (allowPrice) {
            fetchProducts({ price });
            setallowPrice(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ok]);

    // const firstUpdate = useRef(true);
    // useLayoutEffect(() => {
    //     if (firstUpdate.current) {
    //         firstUpdate.current = false;
    //         console.log('first time');
    //         return;
    //     }

    //     console.log('componentDidUpdateFunction');
    // }, []);

    const location = useLocation();

    useEffect(() => {
        if (showFilters) {
            setShowFilters(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount().then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            setPrice([0, 0]);
            setStar('');
            setBrand('');
            setColor('');
            setShipping('');

            fetchProducts({ query: text });
            if (!text && allowPrice !== true) {
                loadAllProducts();
                // setPrice([0, 9000]);
            }
        }, 300);
        return () => clearTimeout(delayed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    // 3. load products based on price range
    // let priceTime;
    const handleSlider = (value) => {
        setwaitForFilter(true);
        setallowPrice(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        setCategoryIds([]);
        setPrice(value);
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // useEffect(() => {
    //     fetchProducts({ price });
    //     return () => {
    //         clearTimeout(priceTime);
    //     };
    // }, [price]);

    // const [categoryMatch,setCategoryMatch] = useState([])

    // useEffect(() => {
    //     const x = categories.filter(
    //         (category) =>
    //             category.name.toLowerCase() === selectedCategory.toLowerCase()
    //     );
    //     console.log(x.name);
    // }, [categoryMatch]);

    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = () =>
        categories.map((c) => {
            return (
                <div key={c._id}>
                    <Checkbox
                        onChange={handleCheck}
                        className="pb-2 pl-4"
                        value={c._id}
                        name="category"
                        checked={categoryIds.includes(c._id)}
                    >
                        {c.name.length > 20
                            ? c.name.slice(0, 20) + '...'
                            : c.name}
                    </Checkbox>
                    <br />
                </div>
            );
        });

    useEffect(() => {
        setViewLoading(false);
    }, [viewLoading]);

    // handle check for categories
    const handleCheck = (e, value) => {
        if (e) {
            setwaitForFilter(true);
            // reset
            dispatch({
                type: 'SEARCH_QUERY',
                payload: { text: '' },
            });
            setPrice([0, 0]);
            setStar('');
            setBrand('');
            setColor('');
            setShipping('');
            let inTheState = [...categoryIds];
            let justChecked = e.target.value;
            let foundInTheState = inTheState.indexOf(justChecked); // index or -1

            // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
            if (foundInTheState === -1) {
                inTheState.push(justChecked);
            } else {
                // if found pull out one item from index
                inTheState.splice(foundInTheState, 1);
            }
            setCategoryIds(inTheState);
            const IDs = categories.map((category) => category._id);
            if (inTheState.length === 0) {
                fetchProducts({ category: IDs });
            } else {
                fetchProducts({ category: inTheState });
            }
        } else {
            setwaitForFilter(true);
            // reset
            dispatch({
                type: 'SEARCH_QUERY',
                payload: { text: '' },
            });
            setPrice([0, 0]);
            setStar('');
            setBrand('');
            setColor('');
            setShipping('');
            let inTheState = [...categoryIds];
            let justChecked = value;
            let foundInTheState = inTheState.indexOf(justChecked); // index or -1

            // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
            if (foundInTheState === -1) {
                inTheState.push(justChecked);
            } else {
                // if found pull out one item from index
                inTheState.splice(foundInTheState, 1);
            }
            setCategoryIds(inTheState);
            const IDs = categories.map((category) => category._id);
            if (inTheState.length === 0) {
                fetchProducts({ category: IDs });
            } else {
                fetchProducts({ category: inTheState });
            }
        }
    };

    // 5. show products by star rating
    const handleStarClick = (num) => {
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setBrand('');
        setColor('');
        setShipping('');
        fetchProducts({ stars: num });
    };

    const showStars = () => {
        let stars = [];
        for (let i = 5; i > 1; i--) {
            stars.push(
                <Radio
                    value={i}
                    checked={star === i}
                    key={`${i}-stars`}
                    name={`${i}-stars`}
                    onChange={() => handleStarClick(i)}
                    className="pb-1 pl-4 w-100"
                >
                    <Star numberOfStars={i} />
                </Radio>
            );
        }
        return stars;
    };

    // 7. show products based on brand name
    const showBrands = () => {
        return (
            <div className="row">
                {brands.map((b) => (
                    <div key={b} className="col-6 mb-1">
                        <Radio
                            key={b}
                            value={b}
                            name={b}
                            checked={b === brand}
                            onChange={handleBrand}
                            className=" "
                        >
                            {b}
                        </Radio>
                    </div>
                ))}
            </div>
        );
    };

    const handleBrand = (e) => {
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setColor('');
        setBrand(e.target.value);
        setShipping('');
        fetchProducts({ brand: e.target.value });
    };

    // 8. show products based on color
    const showColors = () =>
        colors.map((c) => (
            <Radio
                key={c}
                value={c}
                name={c}
                checked={c === color}
                onChange={handleColor}
                className="pb-1 pl-4"
            >
                {c}
            </Radio>
        ));

    const handleColor = (e) => {
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor(e.target.value);
        setShipping('');
        fetchProducts({ color: e.target.value });
    };

    // 9. show products based on shipping yes/no
    const showShipping = () => (
        <>
            <Checkbox
                className="pb-2 pl-4"
                onChange={handleShippingchange}
                value="Yes"
                checked={shipping === 'Yes'}
            >
                Yes
            </Checkbox>

            <Checkbox
                className="pb-2 pl-4"
                onChange={handleShippingchange}
                value="No"
                checked={shipping === 'No'}
            >
                No
            </Checkbox>
        </>
    );

    const handleShippingchange = (e) => {
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value });
    };

    return (
        <div
            className={`${products.length >= 1 ? 'position-relative' : ''}`}
            style={{
                minHeight: `${products.length < 1 && '80vh'}`,
            }}
        >
            {loading ? (
                <div className="row py-5" style={{ height: '150vh' }}>
                    <div
                        className="col-xl-3 col-md-4 px-0 d-none d-md-block"
                        style={{ marginTop: `${loading ? '-33px' : ''}` }}
                    >
                        <LoadingCard isPlpFilters={true} count={2} />
                    </div>
                    <div className="col-12 col-md-8 px-0 col-xl-9">
                        <LoadingCard isPlpCard={true} count={8} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="d-none d-md-block col-md-4 col-lg-3 py-1"></div>
                        <div
                            className={`col-12 col-md-8 col-lg-9 py-2 px-0 pl-md-3 white-bg mb-4 border-0 ${
                                products.length >= 1 ? 'pt-md-4' : ''
                            }`}
                        >
                            <div className="views-filters d-flex d-md-none py-2">
                                <span className="products-found">
                                    {products.length >= 1
                                        ? `${products.length} products found`
                                        : 'no products found'}
                                </span>
                                <div className="align-items-center d-flex">
                                    <button
                                        className="filters"
                                        onClick={() => setShowFilters(true)}
                                    >
                                        FILTER
                                        <FilterIcon />
                                    </button>
                                    <button
                                        className="views"
                                        onClick={() => {
                                            setViewLoading(true);
                                            setView(
                                                view === 'grid'
                                                    ? 'list'
                                                    : 'grid'
                                            );
                                        }}
                                    >
                                        {view === 'grid' ? (
                                            <ListIcon />
                                        ) : (
                                            <GridIcon />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="views d-none d-md-block py-1">
                                {view === 'grid' ? (
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-5 pl-3">
                                            <span className="items-found">
                                                {products.length >= 1
                                                    ? `${products.length} products found`
                                                    : 'no products found'}
                                            </span>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="d-flex align-items-center justify-content-end"
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    setViewLoading(true);
                                                    setView('list');
                                                }}
                                            >
                                                <span className="views__text">
                                                    list
                                                </span>
                                                <div className="views__icon-container">
                                                    <ListIcon className="views__icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-5 pl-3">
                                            <span className="items-found">
                                                {products.length >= 1
                                                    ? `${products.length} products found`
                                                    : 'no products found'}
                                            </span>
                                        </div>
                                        <div className="col-4">
                                            <div
                                                className="d-flex align-items-center justify-content-end"
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    setViewLoading(true);
                                                    setView('grid');
                                                }}
                                            >
                                                <span className="views__text">
                                                    Grid
                                                </span>
                                                <div className="views__icon-container">
                                                    <GridIcon className="views__icon" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        className={`filters-sm ${showFilters ? 'active' : ''}`}
                    >
                        <Menu
                            className="products-fliters pt-0 pt-md-5"
                            defaultOpenKeys={['1']}
                            mode="inline"
                        >
                            <div className="filters-sm__top">
                                <h2 className="title">Filter</h2>
                                <CloseIcon
                                    onClick={() => setShowFilters(false)}
                                />
                            </div>
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="1"
                                title={
                                    <div>
                                        {/* <DollarOutlined /> Price */}
                                        <h3>Price</h3>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div>
                                    <Slider
                                        className="ml-5 mr-4"
                                        tipFormatter={(v) => `JD${v}`}
                                        range
                                        defaultValue={[1, 9000]}
                                        onChange={handleSlider}
                                        max="9000"
                                    />
                                </div>
                            </SubMenu>

                            {/* category */}
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="2"
                                title={
                                    <div>
                                        {/* <DollarOutlined /> Price */}
                                        <h3>Categories</h3>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div style={{ maringTop: '-10px' }}>
                                    {showCategories()}
                                </div>
                            </SubMenu>

                            {/* stars */}
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="3"
                                title={
                                    <div>
                                        {/* <DollarOutlined /> Price */}
                                        <h3>Rating</h3>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div style={{ maringTop: '-10px' }}>
                                    {showStars()}
                                </div>
                            </SubMenu>

                            {/* sub category */}

                            {/* brands */}
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="4"
                                title={
                                    <div>
                                        {/* <DollarOutlined /> Price */}
                                        <h3>Brands</h3>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div
                                    style={{ maringTop: '-10px' }}
                                    className="pr-5"
                                >
                                    {showBrands()}
                                </div>
                            </SubMenu>

                            {/* colors */}
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="5"
                                title={
                                    <div>
                                        {/* <DollarOutlined /> Price */}
                                        <h3>Colors</h3>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div
                                    style={{ maringTop: '-10px' }}
                                    className="pr-5"
                                >
                                    {showColors()}
                                </div>
                            </SubMenu>

                            {/* shipping */}
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="6"
                                title={
                                    <div>
                                        {/* <DollarOutlined /> Price */}
                                        <h3>Shipping</h3>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div
                                    style={{ maringTop: '-10px' }}
                                    className="pr-5"
                                >
                                    {showShipping()}
                                </div>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className="row">
                        <div
                            style={{ marginTop: '-60px' }}
                            className="col-md-4 col-lg-3 d-none d-md-block px-0"
                        >
                            <Menu
                                className="products-fliters"
                                defaultOpenKeys={['1']}
                                mode="inline"
                            >
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="1"
                                    title={
                                        <div>
                                            {/* <DollarOutlined /> Price */}
                                            <h3>Price</h3>
                                            <div className="arrow"></div>
                                        </div>
                                    }
                                >
                                    <div>
                                        <Slider
                                            className="ml-5 mr-4"
                                            tipFormatter={(v) => `$${v}`}
                                            range
                                            defaultValue={[1, 9000]}
                                            onChange={handleSlider}
                                            max="9000"
                                        />
                                    </div>
                                </SubMenu>

                                {/* category */}
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="2"
                                    title={
                                        <div>
                                            {/* <DollarOutlined /> Price */}
                                            <h3>Categories</h3>
                                            <div className="arrow"></div>
                                        </div>
                                    }
                                >
                                    <div style={{ maringTop: '-10px' }}>
                                        {showCategories()}
                                    </div>
                                </SubMenu>

                                {/* stars */}
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="3"
                                    title={
                                        <div>
                                            {/* <DollarOutlined /> Price */}
                                            <h3>Rating</h3>
                                            <div className="arrow"></div>
                                        </div>
                                    }
                                >
                                    <div style={{ maringTop: '-10px' }}>
                                        {showStars()}
                                    </div>
                                </SubMenu>

                                {/* sub category */}

                                {/* brands */}
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="4"
                                    title={
                                        <div>
                                            {/* <DollarOutlined /> Price */}
                                            <h3>Brands</h3>
                                            <div className="arrow"></div>
                                        </div>
                                    }
                                >
                                    <div
                                        style={{ maringTop: '-10px' }}
                                        className="pr-5"
                                    >
                                        {showBrands()}
                                    </div>
                                </SubMenu>

                                {/* colors */}
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="5"
                                    title={
                                        <div>
                                            {/* <DollarOutlined /> Price */}
                                            <h3>Colors</h3>
                                            <div className="arrow"></div>
                                        </div>
                                    }
                                >
                                    <div
                                        style={{ maringTop: '-10px' }}
                                        className="pr-5"
                                    >
                                        {showColors()}
                                    </div>
                                </SubMenu>

                                {/* shipping */}
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="6"
                                    title={
                                        <div>
                                            {/* <DollarOutlined /> Price */}
                                            <h3>Shipping</h3>
                                            <div className="arrow"></div>
                                        </div>
                                    }
                                >
                                    <div
                                        style={{ maringTop: '-10px' }}
                                        className="pr-5"
                                    >
                                        {showShipping()}
                                    </div>
                                </SubMenu>
                            </Menu>
                        </div>

                        <div className="col-12 col-md-8 col-lg-9 pt-0 px-0 px-md-3">
                            {/* {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <div className="text-danger">Products</div>
                    )} */}

                            {/* {products.length < 1 && <p>No products found</p>} */}

                            <div className="row pb-3 ">
                                {waitForFilter ? (
                                    <div className="col-12 col-lg-12 px-0 col-xl-12">
                                        <LoadingCard
                                            isPlpCard={true}
                                            count={8}
                                        />
                                    </div>
                                ) : viewLoading && view === 'grid' ? (
                                    <div className="col-12 col-lg-12 px-0 col-xl-12">
                                        <LoadingCard
                                            isPlpCard={true}
                                            count={8}
                                        />
                                    </div>
                                ) : viewLoading && view === 'list' ? (
                                    <div className="col-12 col-lg-12 px-0 col-xl-12">
                                        <LoadingCard
                                            isPlPCardList={true}
                                            count={8}
                                        />
                                    </div>
                                ) : products && products.length >= 1 ? (
                                    products.map((p, idx) => {
                                        return (
                                            <div
                                                key={p._id}
                                                className={`${
                                                    view === 'grid' &&
                                                    idx % 2 === 0
                                                        ? 'col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 pl-2 pr-2 px-sm-3'
                                                        : view === 'grid' &&
                                                          idx % 2 === 1
                                                        ? 'col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 pr-2 pl-2 px-sm-3'
                                                        : 'col-12 px-0 px-md-3'
                                                } mb-3`}
                                            >
                                                {view === 'grid' ? (
                                                    <ProductCard product={p} />
                                                ) : (
                                                    <ProductCardRow
                                                        p={p}
                                                        wishListCard={false}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })
                                ) : !products || products.length < 1 ? (
                                    <>
                                        <div className="text-center mx-auto">
                                            <NotFoundIcon className="not-found-icon" />
                                            <h4 className="no-thing__title mt-4">
                                                We couldn’t find what you were
                                                looking for
                                            </h4>
                                            <p className="no-thing__subtitle">
                                                We have many other products that
                                                you may like!
                                            </p>
                                            <button
                                                className="form-save-button no-thing-button"
                                                style={{ height: 'unset' }}
                                            >
                                                <Link
                                                    to="/shop"
                                                    onClick={() =>
                                                        loadAllProducts()
                                                    }
                                                >
                                                    CONTINUE SHOPPING
                                                </Link>
                                            </button>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Shop;
