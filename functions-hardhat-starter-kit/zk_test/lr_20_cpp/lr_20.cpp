#include <stdio.h>
#include <iostream>
#include <assert.h>
#include "circom.hpp"
#include "calcwit.hpp"
void lr_20_0_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather);
void lr_20_0_run(uint ctx_index,Circom_CalcWit* ctx);
Circom_TemplateFunction _functionTable[1] = { 
lr_20_0_run };
Circom_TemplateFunction _functionTableParallel[1] = { 
NULL };
uint get_main_input_signal_start() {return 2;}

uint get_main_input_signal_no() {return 41;}

uint get_total_signal_no() {return 63;}

uint get_number_of_components() {return 1;}

uint get_size_of_input_hashmap() {return 256;}

uint get_size_of_witness() {return 62;}

uint get_size_of_constants() {return 0;}

uint get_size_of_io_map() {return 0;}

void release_memory_component(Circom_CalcWit* ctx, uint pos) {{

if (pos != 0){{

if(ctx->componentMemory[pos].subcomponents)
delete []ctx->componentMemory[pos].subcomponents;

if(ctx->componentMemory[pos].subcomponentsParallel)
delete []ctx->componentMemory[pos].subcomponentsParallel;

if(ctx->componentMemory[pos].outputIsSet)
delete []ctx->componentMemory[pos].outputIsSet;

if(ctx->componentMemory[pos].mutexes)
delete []ctx->componentMemory[pos].mutexes;

if(ctx->componentMemory[pos].cvs)
delete []ctx->componentMemory[pos].cvs;

if(ctx->componentMemory[pos].sbct)
delete []ctx->componentMemory[pos].sbct;

}}


}}


// function declarations
// template declarations
void lr_20_0_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather){
ctx->componentMemory[coffset].templateId = 0;
ctx->componentMemory[coffset].templateName = "lr_20";
ctx->componentMemory[coffset].signalStart = soffset;
ctx->componentMemory[coffset].inputCounter = 41;
ctx->componentMemory[coffset].componentName = componentName;
ctx->componentMemory[coffset].idFather = componentFather;
ctx->componentMemory[coffset].subcomponents = new uint[0];
}

void lr_20_0_run(uint ctx_index,Circom_CalcWit* ctx){
FrElement* signalValues = ctx->signalValues;
u64 mySignalStart = ctx->componentMemory[ctx_index].signalStart;
std::string myTemplateName = ctx->componentMemory[ctx_index].templateName;
std::string myComponentName = ctx->componentMemory[ctx_index].componentName;
u64 myFather = ctx->componentMemory[ctx_index].idFather;
u64 myId = ctx_index;
u32* mySubcomponents = ctx->componentMemory[ctx_index].subcomponents;
bool* mySubcomponentsParallel = ctx->componentMemory[ctx_index].subcomponentsParallel;
FrElement* circuitConstants = ctx->circuitConstants;
std::string* listOfTemplateMessages = ctx->listOfTemplateMessages;
FrElement expaux[22];
FrElement lvar[0];
uint sub_component_aux;
uint index_multiple_eq;
{
PFrElement aux_dest = &signalValues[mySignalStart + 42];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 2],&signalValues[mySignalStart + 22]); // line circom 13
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 43];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 3],&signalValues[mySignalStart + 23]); // line circom 14
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 44];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 4],&signalValues[mySignalStart + 24]); // line circom 15
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 45];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 5],&signalValues[mySignalStart + 25]); // line circom 16
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 46];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 6],&signalValues[mySignalStart + 26]); // line circom 17
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 47];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 7],&signalValues[mySignalStart + 27]); // line circom 18
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 48];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 8],&signalValues[mySignalStart + 28]); // line circom 19
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 49];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 9],&signalValues[mySignalStart + 29]); // line circom 20
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 50];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 10],&signalValues[mySignalStart + 30]); // line circom 21
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 51];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 11],&signalValues[mySignalStart + 31]); // line circom 22
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 52];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 12],&signalValues[mySignalStart + 32]); // line circom 23
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 53];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 13],&signalValues[mySignalStart + 33]); // line circom 24
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 54];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 14],&signalValues[mySignalStart + 34]); // line circom 25
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 55];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 15],&signalValues[mySignalStart + 35]); // line circom 26
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 56];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 16],&signalValues[mySignalStart + 36]); // line circom 27
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 57];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 17],&signalValues[mySignalStart + 37]); // line circom 28
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 58];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 18],&signalValues[mySignalStart + 38]); // line circom 29
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 59];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 19],&signalValues[mySignalStart + 39]); // line circom 30
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 60];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 20],&signalValues[mySignalStart + 40]); // line circom 31
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 61];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 21],&signalValues[mySignalStart + 41]); // line circom 32
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 0];
// load src
Fr_add(&expaux[19],&signalValues[mySignalStart + 1],&signalValues[mySignalStart + 42]); // line circom 34
Fr_add(&expaux[18],&expaux[19],&signalValues[mySignalStart + 43]); // line circom 34
Fr_add(&expaux[17],&expaux[18],&signalValues[mySignalStart + 44]); // line circom 34
Fr_add(&expaux[16],&expaux[17],&signalValues[mySignalStart + 45]); // line circom 34
Fr_add(&expaux[15],&expaux[16],&signalValues[mySignalStart + 46]); // line circom 34
Fr_add(&expaux[14],&expaux[15],&signalValues[mySignalStart + 47]); // line circom 34
Fr_add(&expaux[13],&expaux[14],&signalValues[mySignalStart + 48]); // line circom 34
Fr_add(&expaux[12],&expaux[13],&signalValues[mySignalStart + 49]); // line circom 34
Fr_add(&expaux[11],&expaux[12],&signalValues[mySignalStart + 50]); // line circom 34
Fr_add(&expaux[10],&expaux[11],&signalValues[mySignalStart + 51]); // line circom 34
Fr_add(&expaux[9],&expaux[10],&signalValues[mySignalStart + 52]); // line circom 34
Fr_add(&expaux[8],&expaux[9],&signalValues[mySignalStart + 53]); // line circom 34
Fr_add(&expaux[7],&expaux[8],&signalValues[mySignalStart + 54]); // line circom 34
Fr_add(&expaux[6],&expaux[7],&signalValues[mySignalStart + 55]); // line circom 34
Fr_add(&expaux[5],&expaux[6],&signalValues[mySignalStart + 56]); // line circom 34
Fr_add(&expaux[4],&expaux[5],&signalValues[mySignalStart + 57]); // line circom 34
Fr_add(&expaux[3],&expaux[4],&signalValues[mySignalStart + 58]); // line circom 34
Fr_add(&expaux[2],&expaux[3],&signalValues[mySignalStart + 59]); // line circom 34
Fr_add(&expaux[1],&expaux[2],&signalValues[mySignalStart + 60]); // line circom 34
Fr_add(&expaux[0],&expaux[1],&signalValues[mySignalStart + 61]); // line circom 34
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
for (uint i = 0; i < 0; i++){
uint index_subc = ctx->componentMemory[ctx_index].subcomponents[i];
if (index_subc != 0)release_memory_component(ctx,index_subc);
}
}

void run(Circom_CalcWit* ctx){
lr_20_0_create(1,0,ctx,"main",0);
lr_20_0_run(0,ctx);
}

