import DefaultLayout from "components/templates/DefaultLayout";
import MobileLayout from "components/templates/MobileLayout";
import React from "react";
import { BrowserView, MobileView } from "react-device-detect";

const Cart = () => {
    return (
        <React.Fragment>
            <BrowserView>
                    <div className="container">
                        <DefaultLayout>
                            Web Layout
                        </DefaultLayout>
                    </div> 
            </BrowserView>
            <MobileView>
                <MobileLayout>
                    Mobile Layout
                </MobileLayout>
            </MobileView>
        </React.Fragment>
    )
}

export default Cart;