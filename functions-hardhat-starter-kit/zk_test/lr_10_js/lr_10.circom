
    pragma circom 2.0.0;
    template lr_10()
    
    {
        signal input intercept; // The input features
        signal output y;
    
        signal input x1,x2,x3,x4,x5,x6,x7,x8,x9,x10;
        signal input weight1,weight2,weight3,weight4,weight5,weight6,weight7,weight8,weight9,weight10;
        signal aux1,aux2,aux3,aux4,aux5,aux6,aux7,aux8,aux9,aux10;

        aux1 <== x1 * weight1;
        aux2 <== x2 * weight2;
        aux3 <== x3 * weight3;
        aux4 <== x4 * weight4;
        aux5 <== x5 * weight5;
        aux6 <== x6 * weight6;
        aux7 <== x7 * weight7;
        aux8 <== x8 * weight8;
        aux9 <== x9 * weight9;
        aux10 <== x10 * weight10;
        
        y <== intercept + aux1 + aux2 + aux3 + aux4 + aux5 + aux6 + aux7 + aux8 + aux9 + aux10 ;
    }
    

    component main = lr_10();
    