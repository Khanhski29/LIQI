import { memo } from "react";
import './style.scss';
import img1 from "../../../components/IMG_20260420_142143-7h.webp";
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';

const ProductsPage = () => {
    /*
        s <1000
        m 1000-2000
        l 2000-3000
        xl 3000-5000
        xxl >5000

    */

    const featProducts = {
        all:  {
            title: "Tất Cả",
            products: [
                {
                    img: img1,
                    id: "VIP0001",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                },
                {
                    img: img1,
                    id: "VIP0002",
                    price: 400000,
                    description: "Tu len tân thần, Nak vệ thần..."
                },
                {
                    img: img1,
                    id: "VIP0003",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                },
                {
                    img: img1,
                    id: "VIP0006",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                },
                {
                    img: img1,
                    id: "VIP0005",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                },
                {
                    img: img1,
                    id: "VIP0004",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                }
            ]
        },
        s:  {
            title: "<1000",
            products: [
                {
                    img: img1,
                    id: "VIP0002",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                }
            ]
        },
        m:  {
            title: "1000-2000",
            products: [
                {
                    img: img1,
                    id: "VIP0003",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                }
            ]
        },
        l:  {
            title: "2000-3000",
            products: [
                {
                    img: img1,
                    id: "VIP0004",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                }
            ]
        },
        xl:  {
            title: "3000-5000",
            products: [
                {
                    img: img1,
                    id: "VIP0005",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                }
            ]
        },
        xxl:  {
            title: ">5000",
            products: [
                {
                    img: img1,
                    id: "VIP0006",
                    price: 300000,
                    description: "Tu len tân thần, Nak vệ thần..."
                }
            ]
        }
    }

    const renderFeaturedProducts = (data) => {

        const tabList = [];
        const tabPanels = [];
        
        Object.keys(data).forEach((key, index)=> {
            console.log(key, index);
            tabList.push(<Tab key={index}>{data[key].title}</Tab>);
            
            const tabPanel = [];
            data[key].products.forEach((item, j) => {
                tabPanel.push(
                <div className="col lg-4 " key={j}>
                    <div className="item">
                        <img src={item.img}/>
                        <div className="item__about">
                            <div>
                                <p className="id">{item.id}</p>
                                <p className="price">{item.price}</p>
                            </div>
                            <p className="description">{item.description}</p>
                        </div>
                    </div>
                </div>);
            })
            tabPanels.push(tabPanel);
        })




        return (
            <Tabs>
                <TabList>
                    {tabList}
                </TabList>

                {
                    tabPanels.map((item, key) => (
                        <TabPanel key={key}>
                            <div className="row">{item}</div>
                        </TabPanel>

                    ))
                }    
            </Tabs>
        )
    }



    return (
        <div className="products container wide">
            {renderFeaturedProducts(featProducts)}
        </div>
    )
}

export default memo(ProductsPage);