const { exec } = require("child_process");

const fs = require("fs");
const csvWriter = require('csv-write-stream')
const cols = ["weight(s)", "preparation_time", "request_time", "fullfillment_time", "smart_contract_time"];

const csvPath = 'results.csv';
const writer = csvWriter({sendHeaders: true});
const addresses = fs.readFileSync('contract_address.txt', 'utf8').split('\n');
const cmd1 = "node request.js";
////Create CSV File and write headers////
// writer.pipe(fs.createWriteStream(csvPath));

// fs.writeFile(csvPath, cols.join(','), function(err) {
//     if (err) throw err;
// })


// //// TODO: to loop and change smart contract address in 'source.js'
// for(let address of addresses) {
    let num = 38;
    let contract = addresses[num].slice(0, -7).trim();
    console.log(contract);
    ////replace smart contract address in 'source.js'////
    fs.readFile("source.js", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }


        const updatedData = data.replace(
            /const smartContractAddress = "0x[0-9a-fA-F]+";/, 
           `const smartContractAddress = "${contract}";`
        );

        fs.writeFile("source.js", updatedData, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    })

    ////run 'request.js'////
    exec(cmd1, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        

        const lines = stdout.split("\n").slice(-5, -1);
        

        const extractedNumbers = lines.map((item) => {
            const numberStr = item.split(":")[1].trim();
            return parseFloat(numberStr);
        })

        // Write data
        fs.appendFile(csvPath,  (num + 1).toString() + "," + extractedNumbers.join(',') + '\n', function(err) {
            if (err) throw err;
        })
        
    })
// }