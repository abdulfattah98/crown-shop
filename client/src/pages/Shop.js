import React, { useState, useEffect, useRef } from 'react';
import {
    getProductsByCount,
    fetchProductsByFilter,
} from '../functions/product';

import { Link } from 'react-router-dom';
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
    const [price, setPrice] = useState([1, 3000]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState(null);
    // const [subs, setSubs] = useState([]);
    // const [showFilters, setShowFilters] = useState(false);
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
        'Red',
        'Gray',
        'Pink',
        'MidnightGreen',
        'Gold',
        'LightGreen',
        'Purple',
        'Graphite',
        'PacificBlue',
        'SpaceGrey',
        'CloudBlue',
        'CloudNavy',
        'CloudLavender',
        'Bronze',
        'AuraGlow',
        'PrismWhite',
        'PrismBlue',
        'MirrorPurple',
        'SilkyWhite',
        'StarryNight',
    ]);
    const [allowPrice, setallowPrice] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [waitForFilter, setwaitForFilter] = useState(false);
    const [brand, setBrand] = useState('');
    const [shipping, setShipping] = useState('');
    const [searchText, setSearchText] = useState('');
     const [flagText, setFlagText] = useState(true);
    const [filteredColors, setFilteredColors] = useState([]);
    const prevSearchTextLength = useRef(0);

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    let { text } = search;

    const filterOpen = useRef();
    const filtersSm = useRef();

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

    const body = document.querySelector('body');
    const toggleFilter = () => {
        filterOpen.current = !filterOpen.current;
        if (filterOpen.current) {
            filtersSm.current.classList.add('active');
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.position = 'fixed';
            body.style.msTouchAction = 'none';
            body.style.touchAction = 'none';
        } else {
            body.removeAttribute('style');
            filtersSm.current.classList.remove('active');
        }
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

    useEffect(() => {
        let timer;
        setwaitForFilter(true);
        if (searchText.length >= 2) {
            timer = setTimeout(() => {
                const filteredResult = colors.filter(color => color.toLowerCase().includes(searchText.toLowerCase()) ? color : false);
                setFilteredColors(filteredResult);
                fetchProducts({ color: filteredResult })
            }, 500);
        }
        if (searchText.length < 2 && prevSearchTextLength.current >= 2 && flagText) {
            setFilteredColors([]);
            loadAllProducts();
        }
        prevSearchTextLength.current = searchText.length;
        return () => clearTimeout(timer);
    }, [searchText])

    // const firstUpdate = useRef(true);
    // useLayoutEffect(() => {
    //     if (firstUpdate.current) {
    //         firstUpdate.current = false;
    //         console.log('first time');
    //         return;
    //     }

    //     console.log('componentDidUpdateFunction');
    // }, []);

    // useEffect(() => {
    //     if (filterOpen.current) {
    //         toggleFilter();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location]);

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount().then((p) => {
            setProducts(p.data);
            setLoading(false);
            setwaitForFilter(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            setPrice([1, 3000]);
            setStar('');
            setBrand('');
            setFilteredColors([]);
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
        setPrice(value);
        setwaitForFilter(true);
        setallowPrice(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setFilteredColors([]);
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
                <div key={c._id} className="shop-inputs">
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
            setwaitForFilter(true);
            // reset
            dispatch({
                type: 'SEARCH_QUERY',
                payload: { text: '' },
            });
            setPrice([1, 3000]);
            setStar('');
            setBrand('');
            setFilteredColors([]);
            setShipping('');
        } else {
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
            setwaitForFilter(true);
            // reset
            dispatch({
                type: 'SEARCH_QUERY',
                payload: { text: '' },
            });
            setPrice([1, 3000]);
            setStar('');
            setBrand('');
            setFilteredColors([]);
            setShipping('');
        }
    };

    // 5. show products by star rating
    const handleStarClick = (num) => {
        setStar(num);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        setCategoryIds([]);
        setBrand('');
        setFilteredColors([]);
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
            <div className="row shop-inputs">
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
        setBrand(e.target.value);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        setCategoryIds([]);
        setStar('');
        setFilteredColors([]);
        setShipping('');
        fetchProducts({ brand: e.target.value });
    };

    // 8. show products based on color
    const showColors = () => (
        <div className="row shop-inputs">
            {colors.map((c) => (
                <div className="col-6 my-1" key={c}>
                    <Checkbox checked={filteredColors.includes(c)} className="pb-1 pl-4 my-1 d-flex align-items-center" onChange={handleColor} value={c}>
                        {c}
                    </Checkbox>
                </div>
            ))}
        </div>
    );

    const handleColor = (e) => {
        setFlagText(false);
        setSearchText('');
        let currentFilteredColors = filteredColors;
        if (e.target.checked) {
            currentFilteredColors.push(e.target.value)
        } else {
            currentFilteredColors = currentFilteredColors.filter(color => color !== e.target.value);
        }
        setFilteredColors(currentFilteredColors);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setShipping('');
        if (currentFilteredColors.length) {
            fetchProducts({ color: currentFilteredColors });
        } else {
            loadAllProducts();
        }
    };

    // 9. show products based on shipping yes/no
    const showShipping = () => (
        <div className="shop-inputs">
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
        </div>
    );

    const handleShippingchange = (e) => {
        setShipping(e.target.value);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setFilteredColors([]);
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
                                        onClick={toggleFilter}
                                    >
                                        FILTER
                                        <FilterIcon />
                                    </button>
                                    <button
                                        className="views"
                                        onClick={() => {
                                            setView(
                                                view === 'grid'
                                                    ? 'list'
                                                    : 'grid'
                                            );
                                            setViewLoading(true);
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
                                                    setView('list');
                                                    setViewLoading(true);
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
                                                    setView('grid');
                                                    setViewLoading(true);
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
                            <input
                                type="text"
                                placeholder="Looking for specific colors?"
                                className="color-search-autocomplete"
                                onChange={({ target: { value } }) => {
                                    setFlagText(true);
                                    setSearchText(value)
                                }}
                                value={searchText}
                            />
                        </div>
                    </div>
                    <div ref={filtersSm} className={`filters-sm`}>
                        <Menu
                            className="products-fliters pt-0 pt-md-5"
                            defaultOpenKeys={['1']}
                            mode="inline"
                        >
                            <div className="filters-sm__top">
                                <h2 className="title">Filter</h2>
                                <CloseIcon onClick={toggleFilter} />
                            </div>
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="1"
                                title={
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <h3>Price</h3>
                                            <span className="ml-5 mt-1 price-from-to">
                                                <span className="price-from">
                                                    <span className="currency">
                                                        JD
                                                    </span>
                                                    <span className="value">
                                                        {price[0]}
                                                    </span>
                                                </span>
                                                &nbsp;&nbsp;—&nbsp;&nbsp;
                                                <span className="price-to">
                                                    <span className="currency">
                                                        JD
                                                    </span>
                                                    <span className="value">
                                                        {price[1]}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                        <div className="arrow"></div>
                                    </div>
                                }
                            >
                                <div>
                                    <Slider
                                        className="ml-5 mr-4"
                                        tipFormatter={(v) => `JD${v}`}
                                        range
                                        value={price}
                                        defaultValue={[1, 3000]}
                                        onChange={handleSlider}
                                        max="3000"
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
                                <div
                                    className="shop-inputs"
                                    style={{ maringTop: '-10px' }}
                                >
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
                                            tipFormatter={(v) => `JD${v}`}
                                            range
                                            value={price}
                                            defaultValue={[1, 3000]}
                                            onChange={handleSlider}
                                            max="3000"
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
                                                    onClick={() => {
                                                        setwaitForFilter(true);
                                                        loadAllProducts();
                                                    }}
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
