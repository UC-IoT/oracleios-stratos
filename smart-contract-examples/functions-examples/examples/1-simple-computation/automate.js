const { execSync } = require("child_process");
const fs = require("fs");
const csvWriter = require('csv-write-stream');

const cols = ["weight(s)", "preparation_time", "request_time", "fulfillment_time", "smart_contract_time"];
const csvPath = 'results.csv';
const addresses = fs.readFileSync('contract_address.txt', 'utf8').split('\n');
const cmd1 = "node request.js";

// Create CSV file and write headers
const writer = csvWriter({ sendHeaders: true });
writer.pipe(fs.createWriteStream(csvPath));
fs.writeFile(csvPath, cols.join(','), function(err) {
    if (err) throw err;
});

// Define an async function to execute contracts sequentially
async function executeContracts() {
    for (let address of addresses) {
        let contract = address.slice(0, -7); 

        // Replace smart contract address in 'source.js'
        const sourceData = fs.readFileSync("source.js", "utf8");
        const updatedData = sourceData.replace(
            /const smartContractAddress = "0x[0-9a-fA-F]+";/,
            `const smartContractAddress = "${contract}";`
        );
        fs.writeFileSync("source.js", updatedData);

        // Execute request.js
        try {
            const stdout = execSync(cmd1, { encoding: "utf8" }); // Execute synchronously
            // await new Promise((resolve) => setTimeout(resolve, 5 *60 * 1000));
            const lines = stdout.split("\n").slice(-5, -1);
            const extractedNumbers = lines.map((item) => {
                const numberStr = item.split(":")[1].trim();
                return parseFloat(numberStr);
            });

            // Append data to CSV file
            fs.appendFileSync(csvPath, extractedNumbers.join(',') + '\n');
        } catch (err) {
            console.error(`Error executing contract: ${err.message}`);
        }

        // Add a delay (e.g., 5 seconds) to allow time for response
        await new Promise((resolve) => setTimeout(resolve, 5 *60 * 1000));
    }
}


// Call the function to execute contracts
executeContracts().then(() => {
    console.log("Execution completed and results appended to results.csv");
});