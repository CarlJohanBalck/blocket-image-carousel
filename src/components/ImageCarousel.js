import React from 'react'
import Lottie from "react-lottie";
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
            done: false,
            photoItems: [],
            photoItem: [], 
            length: null
        };
    }
    componentDidMount(){
        fetch("https://api.unsplash.com/photos?client_id=drn3zQ5Y0vHaN5ThnOpBDWcJAZm1cKh1N2ks_GQjuE0")
        .then(response => response.json())
        .then(json => {
            this.setState({
                done: true,
                photoItems: json,
                length: json.length});
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
                        <Lottie options={defaultOptions} height={241} width={352} />
                    ) : (
                        <div>
                            {photoItems.map((photoItem, index) => (
                                <Card
                                    photoItem={photoItem}
                                    index={index}
                                    key={index}
                                ></Card>
                            ))}
                        </div>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

