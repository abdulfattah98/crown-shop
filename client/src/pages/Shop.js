import React, { useState, useEffect } from 'react';
import {
    getProductsByCount,
    fetchProductsByFilter,
} from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import ProductCardRow from '../components/cards/ProductCardRow';
import {
    DollarOutlined,
    DownSquareOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Star from '../components/forms/Star';

import { ReactComponent as AngleDownIcon } from './angle-down.svg';
import { ReactComponent as FilterIcon } from './filter.svg';
import { ReactComponent as ListIcon } from './list.svg';
import { ReactComponent as GridIcon } from './grid.svg';
import { ReactComponent as CloseIcon } from './close.svg';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [view, setView] = useState('grid');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
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

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
                loadAllProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range
    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        console.log(value);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        setCategoryIds([]);
        setPrice(value);
        setStar('');
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = () => {
        if (categories && categories.length) {
            return categories.map((c) => {
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
        }
    };

    // handle check for categories
    const handleCheck = (e) => {
        // reset
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setStar('');
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        // console.log(e.target.value);
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
        // console.log(inTheState);
        fetchProducts({ category: inTheState });
    };

    // 5. show products by star rating
    const handleStarClick = (num) => {
        console.log(num);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
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

    // 6. show products by sub category
    const showSubs = () => {
        if (subs && subs.length) {
            return subs.map((s) => (
                <div
                    key={s._id}
                    onClick={() => handleSub(s)}
                    className="p-1 m-1 badge badge-secondary"
                    style={{ cursor: 'pointer' }}
                >
                    {s.name}
                </div>
            ));
        }
    };

    const handleSub = (sub) => {
        // console.log("SUB", sub);
        setSub(sub);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        fetchProducts({ sub });
    };

    // 7. show products based on brand name
    const showBrands = () => {
        return (
            <div className="row">
                {brands &&
                    brands.length &&
                    brands.map((b) => (
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
        setSub('');
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
    const showColors = () => {
        if (colors && colors.length) {
            return colors.map((c) => (
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
        }
    };
    const handleColor = (e) => {
        setSub('');
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
        setSub('');
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
        <div className="position-relative">
            <div className={`filters-sm ${showFilters ? 'active' : ''}`}>
                <Menu
                    className="products-fliters pt-0 pt-md-5"
                    defaultOpenKeys={['1']}
                    mode="inline"
                >
                    <div className="filters-sm__top">
                        <h2 className="title">Filter</h2>
                        <CloseIcon onClick={() => setShowFilters(false)} />
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
                                tipFormatter={(v) => `$${v}`}
                                range
                                defaultValue={[1, 1000]}
                                onChange={handleSlider}
                                max="5000"
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
                        <div style={{ maringTop: '-10px' }}>{showStars()}</div>
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
                        <div style={{ maringTop: '-10px' }} className="pr-5">
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
                        <div style={{ maringTop: '-10px' }} className="pr-5">
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
                        <div style={{ maringTop: '-10px' }} className="pr-5">
                            {showShipping()}
                        </div>
                    </SubMenu>
                </Menu>
            </div>
            <div className="row">
                <div className="col-md-4 col-lg-3 d-none d-md-block px-0">
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
                                    defaultValue={[1, 1000]}
                                    onChange={handleSlider}
                                    max="5000"
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

                <div className="col-12 col-md-8 col-lg-9 pt-0 pt-md-2 px-0 px-md-3">
                    {/* {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <div className="text-danger">Products</div>
                    )} */}

                    {/* {products.length < 1 && <p>No products found</p>} */}

                    <div className="row pb-3 ">
                        <div className="col-12 px-0 pl-md-3 white-bg mb-4 pt-4">
                            <div className="views-filters d-flex d-md-none">
                                <span className="products-found">
                                    {products.length >= 1
                                        ? `${products.length} products found`
                                        : 'no products found'}
                                </span>
                                <div
                                    className={`align-items-center ${
                                        products.length >= 1
                                            ? 'd-flex'
                                            : 'd-none'
                                    }`}
                                >
                                    <button
                                        className="filters"
                                        onClick={() => setShowFilters(true)}
                                    >
                                        FILTER
                                        <FilterIcon />
                                    </button>
                                    <button
                                        className="views"
                                        onClick={() =>
                                            setView(
                                                view === 'grid'
                                                    ? 'list'
                                                    : 'grid'
                                            )
                                        }
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
                                        <div className="col-4 pl-0">
                                            <span className="items-found">
                                                {products.length >= 1
                                                    ? `${products.length} products found`
                                                    : 'no products found'}
                                            </span>
                                        </div>
                                        <div
                                            className={`col-4 ${
                                                products.length < 1
                                                    ? 'd-none'
                                                    : ''
                                            }`}
                                        >
                                            <div
                                                className="d-flex align-items-center justify-content-end"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setView('list')}
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
                                        <div className="col-4 pl-0">
                                            <span className="items-found">
                                                {products.length >= 1
                                                    ? `${products.length} found in`
                                                    : 'no products found'}
                                            </span>
                                        </div>
                                        <div
                                            className={`col-4 ${
                                                products.length < 1
                                                    ? 'd-none'
                                                    : ''
                                            }`}
                                        >
                                            <div
                                                className="d-flex align-items-center justify-content-end"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setView('grid')}
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
                        {products &&
                            products.length &&
                            products.map((p, idx) => (
                                <div
                                    key={p._id}
                                    className={`${
                                        view === 'grid' && idx % 2 === 0
                                            ? 'col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 pl-0 pr-2 px-sm-3'
                                            : view === 'grid' && idx % 2 === 1
                                            ? 'col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 pr-0 pl-2 px-sm-3'
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
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
