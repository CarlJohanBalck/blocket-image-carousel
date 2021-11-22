import React, {useState, useEffect} from 'react';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi' 
import "../scss/App.scss";
import * as imageLoader from '../assets/loading.json';
import Card from './Card'

function ImageCarousel(props) {

    const [slideState, setSlideState] = useState({
            done: false,
            photoItems: [],
            photoItem: [],
            length: null,
            searchQuery: ""
    }); 
    const [current, setCurrent] = useState(0);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: imageLoader.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
   
    useEffect(() => {
        setSlideState({done: false});
        fetch("https://api.unsplash.com/photos?client_id=drn3zQ5Y0vHaN5ThnOpBDWcJAZm1cKh1N2ks_GQjuE0")
        .then(response => response.json())
        .then(json => {
            setSlideState({
                photoItems: json,
                photoItem: json[0],
                length: json.length,
                done: true                
            })
        })
        .catch(function() {
            console.log("error")
        })
    }, [])

    const { done, photoItems, length} = slideState;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
       
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1  : current - 1);
    }

    return (
        <React.Fragment>
                <div>
                    {!done ? (
                        <FadeIn>
                            <div className="lottie">
                                <h2>Fetching images from Unsplash API</h2>
                            </div>
                            <Lottie options={defaultOptions} height={241} width={352} />
                        </FadeIn>
                    ) : (
                        <FadeIn>
                            <BiRightArrow className="right-arrow" onClick={nextSlide}/>
                            <BiLeftArrow className="left-arrow" onClick={prevSlide}/>

                            {length === 0 ? (<h1>No photos was found 😭</h1>) : (
                            <div className={`cards-slider active-slide-${current}`}>
                                <div 
                                    className="cards-slider-wrapper"
                                    style={{ transform: `translateX(-${current *
                                        (100 / length)}%)`
                                    }}
                                    >
                                    {photoItems.map((photoItem, index) => (
                                        <Card
                                            photoItem={photoItem}
                                            index={index}
                                            key={index}
                                        ></Card>
                                    ))}
                                </div>
                            </div>)} 
                        <div>
                    </div>
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
    );
}

export default ImageCarousel;