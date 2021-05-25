import React from 'react'

export default class Card extends React.Component {
    constructor(props) {
      
        super(props);
        this.state = {
          photoItem: props.photoItem,
          index: props.index       
        };
      }

    render() {
        const photoItem = this.state.photoItem;
        const {regular} = photoItem.urls;
        return (
            <div>
               <img src={regular} alt="card"></img>
            </div>
        )
    }
}
