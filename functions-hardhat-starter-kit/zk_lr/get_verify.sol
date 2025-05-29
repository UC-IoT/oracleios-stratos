// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Groth16Verifier {
  // Scalar field size
  uint256 constant r = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
  // Base field size
  uint256 constant q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

  // Proof Key data
  uint256 constant pAx = 18489931406816511780168885384260083394391373655467113633214840063329939922809;
  uint256 constant pAy  = 8939767712847425381556316954098272076455607538690405986652795493752278758098;
  uint256 constant pBx1 = 14856656951991432517954402177041151531237641497010919385884918011133855211352;
  uint256 constant pBx2 = 4457468826242349222119392972980223762426134832231253860401046848586826487203;
  uint256 constant pBy1 = 18532208345702424762483933572851768971619956126464045536772752527247281853619;
  uint256 constant pBy2 = 2565868873472749377242629781039929861703182878914765568124760761469170856038;
  uint256 constant pCx = 10413711138657892254452320826270955919581279709007539646257996368503971202895;
  uint256 constant pCy = 19222886095755872366747333150233337557758389361407367241714420657028197311034;
  uint256 constant pubSignals = 2158764825354289472467911;

  // Verification Key data
  uint256 constant alphax = 19407578930694438964226890244929655295437571502666078109185338721356349737683;
  uint256 constant alphay = 2696040261232427500252761545302346607996277333788081851965550269795244057555;
  uint256 constant betax1 = 8123261825436532313401092594077164762827642640771106889519243656330639047365;
  uint256 constant betax2 = 8676124492073371340281007609270643379493806650947029500519147176128996940954;
  uint256 constant betay1 = 20724481315978027767201795145584862331774450040127603356268067011271103250006;
  uint256 constant betay2 = 11854436193281613606018535857346542153017674114055675046222398074461370633028;
  uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
  uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
  uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
  uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
  uint256 constant deltax1 = 6678519691753341501276298557667768849409878014490147722318180872464629273457;
  uint256 constant deltax2 = 1775490044839034570466170855929731049242953541817361862415195260566565429820;
  uint256 constant deltay1 = 4346471316478425382616493528228052741890668777984890369251532871561040990632;
  uint256 constant deltay2 = 13547555823235460072692541325824948542895842266877810996816394704101232204118;
  uint256 constant IC0x = 5460348288525064123176302948796245379259781168434157915210202214110459924159;
  uint256 constant IC0y = 1077060756431947463685326173301682978492192567281269332913281680875576190278;
  uint256 constant IC1x = 15834093905156511208603853982812225694140751507800687008974720205938369863027;
  uint256 constant IC1y = 6286138466345441871518353169256448666992282346402571088844003978991377312183;
  // Memory data
  uint16 constant pVk = 0;
  uint16 constant pPairing = 128;

  uint16 constant pLastMem = 896;

  function verifyProof() public view returns (bool) {
    assembly {
      function checkField(v) {
        if iszero(lt(v, q)) {
          mstore(0, 0)
          return(0, 0x20)
        }
      }

      // G1 function to multiply a G1 value(x,y) to value in an address
      function g1_mulAccC(pR, x, y, s) {
        let success
        let mIn := mload(0x40)
        mstore(mIn, x)
        mstore(add(mIn, 32), y)
        mstore(add(mIn, 64), s)

        success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

        if iszero(success) {
          mstore(0, 0)
          return(0, 0x20)
        }

        mstore(add(mIn, 64), mload(pR))
        mstore(add(mIn, 96), mload(add(pR, 32)))

        success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

        if iszero(success) {
          mstore(0, 0)
          return(0, 0x20)
        }
      }

      function checkPairing(pMem) -> isOk {
        let _pPairing := add(pMem, pPairing)
        let _pVk := add(pMem, pVk)

        mstore(_pVk, IC0x)
        mstore(add(_pVk, 32), IC0y)

        // Compute the linear combination vk_x

        g1_mulAccC(_pVk, IC1x, IC1y, pubSignals)

        // -A
        mstore(_pPairing, pAx)
        mstore(add(_pPairing, 32), mod(sub(q, pAy), q))

        // B
        mstore(add(_pPairing, 64), pBx1)
        mstore(add(_pPairing, 96), pBx2)
        mstore(add(_pPairing, 128), pBy1)
        mstore(add(_pPairing, 160), pBy2)

        // alpha1
        mstore(add(_pPairing, 192), alphax)
        mstore(add(_pPairing, 224), alphay)

        // beta2
        mstore(add(_pPairing, 256), betax1)
        mstore(add(_pPairing, 288), betax2)
        mstore(add(_pPairing, 320), betay1)
        mstore(add(_pPairing, 352), betay2)

        // vk_x
        mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
        mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))

        // gamma2
        mstore(add(_pPairing, 448), gammax1)
        mstore(add(_pPairing, 480), gammax2)
        mstore(add(_pPairing, 512), gammay1)
        mstore(add(_pPairing, 544), gammay2)

        // C
        mstore(add(_pPairing, 576), pCx)
        mstore(add(_pPairing, 608), pCy)

        // delta2
        mstore(add(_pPairing, 640), deltax1)
        mstore(add(_pPairing, 672), deltax2)
        mstore(add(_pPairing, 704), deltay1)
        mstore(add(_pPairing, 736), deltay2)

        let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x60)

        isOk := and(success, mload(_pPairing))
      }

      let pMem := mload(0x40)
      mstore(0x40, add(pMem, pLastMem))

      // Validate that all evaluations ∈ F

      checkField(pubSignals)

      checkField(pubSignals)

      // Validate all evaluations
      let isValid := checkPairing(pMem)

      mstore(0, isValid)
      return(0, 0x20)
    }
  }
}
