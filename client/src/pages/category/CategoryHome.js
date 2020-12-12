import React, { useState, useEffect } from 'react';

import {
    getProductsByCount,
    fetchProductsByFilterCat,
} from '../../functions/product';

import { Link, useLocation } from 'react-router-dom';
import LoadingCard from '../../components/cards/LoadingCard';

// import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from '../../functions/category';
import ProductCard from '../../components/cards/ProductCard';

import { Menu, Slider, Checkbox, Radio } from 'antd';
import ProductCardRow from '../../components/cards/ProductCardRow';
import {
    DollarOutlined,
    DownSquareOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Star from '../../components/forms/Star';

import { ReactComponent as AngleDownIcon } from './angle-down.svg';
// import { ReactComponent as AngleUpIcon } from './angle-up.svg';
import { ReactComponent as FilterIcon } from './filter.svg';
import { ReactComponent as ListIcon } from './list.svg';
import { ReactComponent as GridIcon } from './grid.svg';
import { ReactComponent as CloseIcon } from './close.svg';
import { ReactComponent as NotFoundIcon } from './notfound.svg';
const { SubMenu, ItemGroup } = Menu;

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [price, setPrice] = useState([1, 9000]);
    const [ok, setOk] = useState(false);
    const [star, setStar] = useState(null);
    const [subs, setSubs] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sub, setSub] = useState('');
    const [brands, setBrands] = useState([
        'Apple',
        'Samsung',
        'Microsoft',
        'Lenovo',
        'ASUS',
    ]);
    const [viewLoading, setViewLoading] = useState(false);
    const [waitForFilter, setwaitForFilter] = useState(false);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState([
        'Black',
        'Brown',
        'Silver',
        'White',
        'Blue',
    ]);
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('');
    const [view, setView] = useState('grid');

    const { slug } = match.params;

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, [slug]);

    const fetchProducts = (arg) => {
        console.log(category);
        fetchProductsByFilterCat([category, arg]).then((res) => {
            //console.log(res);
            setProducts(res.data);
            setwaitForFilter(false);
        });
    };

    const location = useLocation();

    useEffect(() => {
        if (showFilters) {
            setShowFilters(false);
        }
    }, [location]);

    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        setPrice(value);
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
        setwaitForFilter(true);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        // setCategoryIds([]);
        setStar(num);
        setSub('');
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
                    <div className="col-6 mb-1">
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
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        // setCategoryIds([]);
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
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        // setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor(e.target.value);
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
        setwaitForFilter(true);
        setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        // setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping(e.target.value);
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
                    <div className="col-xl-3 col-md-4 px-0 d-none d-md-block">
                        <LoadingCard isPlpFilters={true} count={2} />
                    </div>
                    <div className="col-12 col-md-8 px-0 col-xl-9">
                        <LoadingCard isPlpCard={true} count={8} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="d-none d-md-block col-md-4 col-lg-3"></div>
                        <div
                            className={`col-12 col-md-8 col-lg-9 px-0 pl-md-3 white-bg mb-4 border-0 ${
                                products.length >= 1 ? 'pt-md-4' : ''
                            }`}
                        >
                            <div className="views-filters d-flex d-md-none py-3">
                                <span className="products-found">
                                    {products.length >= 1
                                        ? `${products.length} Products Found In ${category.name}`
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
                            <div className="views d-none d-md-block">
                                {view === 'grid' ? (
                                    <div className="row align-items-center justify-content-between">
                                        <div className="col-5 col-md-6 pl-3">
                                            <span className="items-found">
                                                {products.length >= 1
                                                    ? `${products.length} Products in ${category.name}`
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
                                            tipFormatter={(v) => `$${v}`}
                                            range
                                            defaultValue={[1, 9000]}
                                            onChange={handleSlider}
                                            max="9000"
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
                                ) : !products || products.length < 1 ? (
                                    <>
                                        {/* <div className="text-center mx-auto">
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
                                        </div> */}
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
