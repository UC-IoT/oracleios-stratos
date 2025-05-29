
    pragma circom 2.0.0;
    template lr_1()
    
    {
        signal input intercept; // The input features
        signal output y;
    
        signal input x1;
        signal input weight1;
        signal aux1;

        aux1 <== x1 * weight1;
        
        y <== intercept ;
    }
    

    component main = lr_1();
    