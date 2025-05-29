
    pragma circom 2.0.0;
    template lr_5()
    
    {
        signal input intercept; // The input features
        signal output y;
    
        signal input x1,x2,x3,x4,x5;
        signal input weight1,weight2,weight3,weight4,weight5;
        signal aux1,aux2,aux3,aux4,aux5;

        aux1 <== x1 * weight1;
        aux2 <== x2 * weight2;
        aux3 <== x3 * weight3;
        aux4 <== x4 * weight4;
        aux5 <== x5 * weight5;
        
        y <== intercept + aux1 + aux2 + aux3 + aux4 + aux5 ;
    }
    

    component main = lr_5();
    