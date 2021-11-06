import React from 'react';
import DefaultLayout from "../../templates/DefaultLayout";
import {BrowserView, MobileView} from 'react-device-detect';
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
                                <img src="images/samsung.jpg" width="100%"></img>
                            </div>
                            <div>
                                <img src="images/samsung2.png" width="100%"></img>
                            </div>
                        </Carousel>
                        <hr/>
                        <ShopList></ShopList>
                    </DefaultLayout>
                </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    <Carousel autoplay>
                        <div>
                            <img src="images/samsung.jpg" width="100%"></img>
                        </div>
                        <div>
                            <img src="images/samsung2.png" width="100%"></img>
                        </div>
                    </Carousel>
                    <hr/>
                    <ShopList></ShopList>
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}
export default Home
