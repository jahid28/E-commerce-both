const initialState = {
    searchQuery: "",
    SingleItemPageObj: {
        name: '',
        type: '',
        img: [],
        price: 0,
        stocks: 0,
        allRatings: [],
        reviews: []
    },
    SmallCartPreviewArr: [],
    SmallCartPreviewTotal: 0,
    isProductFromCart: false,
    // number: 1,
    paymentDetails:{},
    SingleOrderPageObj:{
        name: '',
        type: '',
        img: [],
        price: 0,
        date:'',
        time:'',
        stocks: 0,
        phoneNum: 0,
        address: '',
        pinCode: 0,
        cardNum: 0
    }
  };

const reducer=(state=initialState,action)=>{
    
    switch (action.type) {
        // case 'decrease':
        //     // text: action.payload
        //     return { ...state, number: state.number - action.payload }
            
        //     break;

        // case 'increase':
        //     return  { ...state, number: state.number + action.payload }
            
        //     break;

        case 'searchQuery':
            return  { ...state, searchQuery: action.payload }
            
            break;
        case 'SingleItemPageObj':
            return  { ...state, SingleItemPageObj: action.payload }
            
            break;
        case 'SmallCartPreviewArr':
            return  { ...state, SmallCartPreviewArr: action.payload }
            
            break;
        case 'SmallCartPreviewTotal':
            return  { ...state, SmallCartPreviewTotal: action.payload }
            
            break;
        case 'isProductFromCart':
            return  { ...state, isProductFromCart: action.payload }
            
            break;
        case 'displayProductPage':
            return  { ...state, text: action.payload }
            
            break;
        case 'paymentDetails':
            return  { ...state, paymentDetails: action.payload }
            
            break;
        case 'SingleOrderPageObj':
            return  { ...state, SingleOrderPageObj: action.payload }
            
            break;

        
    
        default:
            return state
            break;
    }
  
    
}

export default reducer

