import React, { useState, useEffect, useRef } from 'react';

import { fetchProductsByFilterCat } from '../../functions/product';

import LoadingCard from '../../components/cards/LoadingCard';

// import { getSubs } from '../functions/sub';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../functions/category';
import ProductCard from '../../components/cards/ProductCard';

import { Menu, Slider, Checkbox, Radio } from 'antd';
import ProductCardRow from '../../components/cards/ProductCardRow';

import Star from '../../components/forms/Star';

import { ReactComponent as FilterIcon } from './filter.svg';
import { ReactComponent as ListIcon } from './list.svg';
import { ReactComponent as GridIcon } from './grid.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as NotFoundIcon } from './notfound.svg';
const { SubMenu } = Menu;

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [price, setPrice] = useState([1, 3000]);
    const [ok, setOk] = useState(false);
    const [star, setStar] = useState(null);
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
    const [viewLoading, setViewLoading] = useState(false);
    const [waitForFilter, setwaitForFilter] = useState(false);
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('');
    const [view, setView] = useState('grid');

    const filterOpen = useRef();
    const filtersSm = useRef();

    const { slug } = match.params;

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, [slug]);

    const fetchProducts = (arg) => {
        fetchProductsByFilterCat([category, arg]).then((res) => {
            //console.log(res);
            setProducts(res.data);
            setwaitForFilter(false);
        });
    };

    // const location = useLocation();

    // useEffect(() => {
    //     if (showFilters) {
    //         setShowFilters(false);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location]);

    useEffect(() => {
        fetchProducts({ price });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ok]);

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

    const handleSlider = (value) => {
        setPrice(value);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    useEffect(() => {
        setViewLoading(false);
    }, [viewLoading]);

    const handleStarClick = (num) => {
        setStar(num);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        // setCategoryIds([]);
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
        setBrand(e.target.value);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        // setCategoryIds([]);
        setStar('');
        setColor('');
        setShipping('');
        fetchProducts({ brand: e.target.value });
    };

    // 8. show products based on color
    const showColors = () => (
        <div className="row">
            {colors.map((c) => (
                <div className="col-6 mb-1" key={c}>
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
                </div>
            ))}
        </div>
    );

    const handleColor = (e) => {
        setColor(e.target.value);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        // setCategoryIds([]);
        setStar('');
        setBrand('');
        setShipping('');
        fetchProducts({ color: e.target.value });
    };

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
        setShipping(e.target.value);
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([1, 3000]);
        // setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        fetchProducts({ shipping: e.target.value });
    };

    return (
        // <div className="container-fluid">
        //     <div className="row">
        //         <div className="col">
        //             {loading ? (
        //                 <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        //                     Loading...
        //                 </h4>
        //             ) : (
        //                 <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        //                     {products.length} Products in{category.name}
        //                 </h4>
        //             )}
        //         </div>
        //     </div>

        //     <div className="row">
        //         {products.map((p) => (
        //             <div className="col" key={p._id}>
        //                 <ProductCard product={p} />
        //             </div>
        //         ))}
        //     </div>
        // </div>
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
                                    {products.length >= 1 ? (
                                        <span>
                                            {products.length} Products Found In
                                            <b>&nbsp;{category.name}</b>
                                        </span>
                                    ) : (
                                        'no products found'
                                    )}
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
                            <div className="views d-none d-md-block">
                                {view === 'grid' ? (
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-5 col-md-6 pl-3">
                                            <span className="items-found">
                                                {products.length >= 1 ? (
                                                    <span>
                                                        {products.length}{' '}
                                                        Products Found In
                                                        <b>
                                                            &nbsp;
                                                            {category.name}
                                                        </b>
                                                    </span>
                                                ) : (
                                                    'no products found'
                                                )}
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

                            {/* stars */}
                            <SubMenu
                                className="products-filters__filter-outer"
                                key="2"
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
                                key="3"
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
                                key="4"
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
                                key="5"
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

                                {/* stars */}
                                <SubMenu
                                    className="products-filters__filter-outer"
                                    key="2"
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
                                    key="3"
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
                                    key="4"
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
                                    key="5"
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
                                ) : products.length < 1 ? (
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

export default CategoryHome;
