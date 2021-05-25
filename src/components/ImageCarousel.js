import React from 'react'
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi' 
import Searchbar from './Searchbar';
import "../App.scss";

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
    nextSlide = () => {
        const photoItems = this.state.photoItems;
        const length = this.state.length;
        let newIndex = this.state.photoItem.index + 1;
        if(newIndex === length){
            newIndex = 0;
        }
        this.setState({
            photoItem: photoItems[newIndex],
            current: newIndex
        }) 
        
    }
    prevSlide = () =>{
        const photoItems = this.state.photoItems;
        const length = this.state.length;
        let newIndex = this.state.photoItem.index - 1;
        if(newIndex <= 0){
            newIndex = length-1;
        }
        this.setState({
            photoItem: photoItems[newIndex],
            current: newIndex
        }) 
    }
    searchImage = (query) => {
        this.setState({ searchQuery: query });
        var fetch_api = "https://api.unsplash.com/search/photos"
        var query_string = "?query=" + query;
        var limit = "?per_page=10"
        var client_id = "&client_id=drn3zQ5Y0vHaN5ThnOpBDWcJAZm1cKh1N2ks_GQjuE0"
        var search_url = fetch_api +query_string+ limit + client_id;
        fetch(search_url)
        .then(response => response.json())
            .then(json => {
                const photoItems = json.results;
                let firstIndex = 0;
                photoItems.forEach(function(element){
                    element.index = firstIndex++;
                })
                const photoItem = photoItems[0];
                this.setState({
                    photoItems,
                    photoItem,
                    length: photoItems.length,
                    done: true,
                })

            })
        .catch(function() {
            console.log("error");
        });
        
    }
    render() {
        const photoItems = this.state.photoItems;
        const current = this.state.current;
        const length = this.state.length;
        const searchQuery = this.state.searchQuery;
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

                            <BiRightArrow className="right-arrow" onClick={this.nextSlide}/>
                            <BiLeftArrow className="left-arrow" onClick={this.prevSlide}/>
                            <Searchbar value={searchQuery} onChange={this.searchImage} className="searchbar"/>



                            {length === 0 ? (<h1>No photos was found 😭</h1>) : (<div className={`cards-slider active-slide-${current}`}>
                                <div
                                    className="cards-slider-wrapper"
                                    style={{
                                    transform: `translateX(-${current *
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
                            {/* <div className={`cards-slider active-slide-${current}`}>
                                <div
                                    className="cards-slider-wrapper"
                                    style={{
                                    transform: `translateX(-${current *
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
                            </div> */}
                            <div>
                        </div>
                        </FadeIn>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

 