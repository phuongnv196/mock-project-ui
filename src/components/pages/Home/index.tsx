import React from 'react';
import DefaultLayout from "../../templates/DefaultLayout";
import { BrowserView, MobileView } from 'react-device-detect';
import MobileLayout from 'components/templates/MobileLayout';
import ShopList from 'components/molecules/ShopList';
import { Carousel } from 'antd';

const Home = () => {
    return (
        <React.Fragment>
            <BrowserView>
                <div className="container">
                    <DefaultLayout>
                        <Carousel autoplay>
                            <div>
                                <img src="images/food1.jpg" width="100%" style={{maxHeight: "200px", objectFit: "cover"}}></img>
                            </div>
                            <div>
                                <img src="images/food2.jpg" width="100%" style={{maxHeight: "200px", objectFit: "cover"}}></img>
                            </div>
                        </Carousel>
                        <hr />
                        <ShopList></ShopList>
                    </DefaultLayout>
                </div>
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <Carousel autoplay>
                        <div>
                            <img src="images/food1.jpg" width="100%" style={{maxHeight: "200px", objectFit: "cover"}}></img>
                        </div>
                        <div>
                            <img src="images/food2.jpg" width="100%" style={{maxHeight: "200px", objectFit: "cover"}}></img>
                        </div>
                    </Carousel>
                    <hr />
                    <ShopList></ShopList>
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}
export default Home
