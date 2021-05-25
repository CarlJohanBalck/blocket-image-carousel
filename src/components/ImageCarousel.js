import React from 'react'
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi' 

import * as imageLoader from '../assets/loading.json';


import Card from './Card'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: imageLoader.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
}
 
export default class ImageCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: undefined,
            done: false,
            photoItems: [],
            photoItem: [],
            length: null,
            searchQuery: ""
        };
    }
    componentDidMount(){
        fetch("https://api.unsplash.com/photos?client_id=drn3zQ5Y0vHaN5ThnOpBDWcJAZm1cKh1N2ks_GQjuE0")
        .then(response => response.json())
        .then(json => {
            const photoItems = json;
            let firstIndex = 0;
            photoItems.forEach(function(element){
                element.index = firstIndex++;
            })
            const temp = photoItems[0];

            this.setState({
                current: 0,
                photoItems,
                length: photoItems.length,
                photoItem: temp});
            setTimeout(() => {
                this.setState({done: true});
            }, 1500)    
        })
        .catch(function() {
            console.log("error");
        });
        
    }
    render() {
        const photoItems = this.state.photoItems;
        return (
            <React.Fragment>
                <div>
                    {!this.state.done ? (
                        <FadeIn>
                            <div className="lottie">
                                <h2>Fetching images from Unsplash API</h2>
                            </div>
                            <Lottie options={defaultOptions} height={241} width={352} />
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            <BiRightArrow className="right-arrow"/>
                            <BiLeftArrow className="left-arrow"/>
                            <div>
                                {photoItems.map((photoItem, index) => (
                                    <Card
                                        photoItem={photoItem}
                                        index={index}
                                        key={index}
                                    ></Card>
                                ))}
                            </div>
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

