/*
.List-item {
  cursor: pointer;
  margin-bottom: 10px;
}
.App-left {
  float: left;
  width: 35%;
}
.App-right {
  width: 65%;
  float: right;
}
*/

import React, {Component} from 'react';
import Axios from 'axios';

const ItemsTable = (props) => (
    <div className='App-right'>
        <h2>Items in Category: ({props.shortName})</h2>
        <table border='1 px'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {props.itemList.map((item, index) =>
                     <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                     </tr>
                )}
            </tbody>
        </table>
    </div>
);

class ChineseMenuApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            itemList: [],
            shortName: '',
            showTable: false
        }
    }
    componentDidMount = () => {
        Axios.get('https://davids-restaurant.herokuapp.com/categories.json')
            .then(response => {
                //console.log(response);
                this.setState ({
                    categoryList: response.data
                });
            })
            .catch(e => console.log('error', e));
    }
    itemsInEachCategory = (short_name) => {
        let url = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + short_name;
        Axios.get(url)
            .then(response => {
                console.log(response);
                this.setState({
                    itemList: response.data.menu_items,
                    shortName: short_name,
                    showTable: true
                });
            })
            .catch(e => console.log('error', e));
    }
    render() {
        let display = (<h1>select a Category</h1>);
        if(this.state.showTable) {
            display = <ItemsTable shortName={this.state.shortName} itemList={this.state.itemList} />  
        }
        return (
            <div>
                <div className='App-left'>
                    <h1>Menu Categories :</h1>
                    <ul>
                        {this.state.categoryList.map((item, index) =>
                        <li 
                            className='List-item' 
                            key={index}
                            onClick={() => this.itemsInEachCategory(item.short_name)}
                        >
                            {item.name} - ({item.short_name})
                        </li> 
                        )}
                    </ul>
                </div>
                {display}
            </div>
        );
    }
}

export default ChineseMenuApp
