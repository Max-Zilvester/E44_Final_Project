import React, {useState, useEffect} from 'react'
import Header from '../components/header/Header';
import ContentContainer from './ContentContainer';
import Request from '../helpers/request'



const MainContainer = ({user, setUser, onCreate, users}) => {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [tables, setTables] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [propKey, setPropKey] = useState(1);
    const [test, setTest] = useState(true);

  
    const apiRequests = () => {
        const request = new Request();
        const tablesPromise = request.get('api/restaurant_tables')
        const parkingPromise = request.get('api/parking_spaces')
        Promise.all([parkingPromise, tablesPromise])
            .then(data => {
                setTables(data[0]);
                setParkingSpots(data[1]);
            });
    }

    useEffect(() => {
        apiRequests()
    }, []);

    useEffect(()=> {
        setOrderItems(orderItems);
    })

    const changeTest = function(){
        setTest(!test);
    }

    const addToFoodCount = function(food){
        let newOrderItems = orderItems;
        newOrderItems.push(food);
        setOrderItems(newOrderItems); 
        let newPropKey = propKey;
        newPropKey += 1;
        setPropKey(newPropKey);
        console.log(orderItems)
      }
    
      const subtractFromFoodCount = function(food){
        for (const order of orderItems) {
          if(food.id == order.id) {
            const index = orderItems.indexOf(order)
            orderItems.splice(index, 1);
            let newPropKey = propKey;
            newPropKey += 1;
            changeTest();
            console.log(orderItems);
            return;
          }
        }
      }
        
      const addToDrinkCount = function(drink){
        let newOrderItems = orderItems;
        newOrderItems.push(drink);
        setOrderItems(newOrderItems); 
        let newPropKey = propKey;
        newPropKey += 1;
        setPropKey(newPropKey);
        console.log(orderItems)
      }
    
      const subtractFromDrinkCount = function(drink){
        for (const order of orderItems) {
          if(drink.id == order.id) {
            const index = orderItems.indexOf(order)
            orderItems.splice(index, 1);
            let newPropKey = propKey;
            newPropKey += 1;
            changeTest();
            console.log(orderItems);
            return;
          }
        }
      }  

    return (
        <>
            <header>
                <Header />
            </header>
            <main id="container">
                <ContentContainer 
                 orderItems = {orderItems}
                 key = {propKey}
                 setOrderItems = {setOrderItems}
                 test = {test}
                 setTest = {setTest}
                 addToFoodCount={addToFoodCount}
                 subtractFromFoodCount={subtractFromFoodCount}
                 addToDrinkCount={addToDrinkCount}
                 subtractFromDrinkCount={subtractFromDrinkCount}
                 user={user} 
                 setUser={setUser} 
                 onCreate={onCreate}
                 users={users}
                 />  
            </main>
            <footer id="footer">
                <span>Pizza Pan, 123 CodeClan Street, Glasgow G1 1AB</span> 
                <span> | </span>
                <span>pizzapan@customerservice.com</span>
                <span> | </span>
                <span>0141 123 1234</span>
            </footer>
        </>
    )
}

export default MainContainer;
