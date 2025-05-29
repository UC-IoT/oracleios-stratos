
    pragma circom 2.0.0;
    template lr_21()
    
    {
        signal input intercept; // The input features
        signal output y;
    
        signal input x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16,x17,x18,x19,x20,x21;
        signal input weight1,weight2,weight3,weight4,weight5,weight6,weight7,weight8,weight9,weight10,weight11,weight12,weight13,weight14,weight15,weight16,weight17,weight18,weight19,weight20,weight21;
        signal aux1,aux2,aux3,aux4,aux5,aux6,aux7,aux8,aux9,aux10,aux11,aux12,aux13,aux14,aux15,aux16,aux17,aux18,aux19,aux20,aux21;

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
        aux11 <== x11 * weight11;
        aux12 <== x12 * weight12;
        aux13 <== x13 * weight13;
        aux14 <== x14 * weight14;
        aux15 <== x15 * weight15;
        aux16 <== x16 * weight16;
        aux17 <== x17 * weight17;
        aux18 <== x18 * weight18;
        aux19 <== x19 * weight19;
        aux20 <== x20 * weight20;
        aux21 <== x21 * weight21;
        
        y <== intercept + aux1 + aux2 + aux3 + aux4 + aux5 + aux6 + aux7 + aux8 + aux9 + aux10 + aux11 + aux12 + aux13 + aux14 + aux15 + aux16 + aux17 + aux18 + aux19 + aux20 + aux21 ;
    }
    

    component main = lr_21();
    