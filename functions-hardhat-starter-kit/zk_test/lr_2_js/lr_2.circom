
    pragma circom 2.0.0;
    template lr_2()
    
    {
        signal input intercept; // The input features
        signal output y;
    
        signal input x1,x2;
        signal input weight1,weight2;
        signal aux1,aux2;

        aux1 <== x1 * weight1;
        aux2 <== x2 * weight2;
        
        y <== intercept + aux1 + aux2 ;
    }
    

    component main = lr_2();
    