
    pragma circom 2.0.0;
    template lr_3()
    
    {
        signal input intercept; // The input features
        signal output y;
    
        signal input x1,x2,x3;
        signal input weight1,weight2,weight3;
        signal aux1,aux2,aux3;

        aux1 <== x1 * weight1;
        aux2 <== x2 * weight2;
        aux3 <== x3 * weight3;
        
        y <== intercept + aux1 + aux2 + aux3 ;
    }
    

    component main = lr_3();
    