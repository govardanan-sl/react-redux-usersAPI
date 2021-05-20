import { Alert } from '@material-ui/lab';
import React from 'react';
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError() {    // Update state so the next render will show the fallback UI.    
        return { hasError: true };  
    }
    componentDidCatch(error, errorInfo) {    // You can also log the error to an error reporting service    
        console.log(error,errorInfo);
    }
    render() {
        if (this.state.hasError) {      // You can render any custom fallback UI      
            return(
                <>
                    <Alert severity="error" style={{height:"100vh",justifyContent:"center"}}>{`An Error Occured with the Application :( `}</Alert>
                </>
            );    
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;