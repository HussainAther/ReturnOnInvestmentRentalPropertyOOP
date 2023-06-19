// import { readCSV } from 'pandas-js';

function visualizeData(data, zhviinputdate) {
  const VisualizationContainer = document.getElementById('visualization-container');
  const Visualization = document.getElementById('visualization-canvas');

  // Example: Create a bar chart using Chart.js library
  const chart = new Chart(Visualization, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'The Data',
        data: Object.values(data),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Value'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount'
          }
        }
      }
    }
  });

  // Fetch the ZHVI data from the CSV file (you can use a library like PapaParse for parsing CSV)
  fetch("lib/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")
    .then(response => response.text())
    .then(csvData => {
      // Parse the CSV data into an array of objects using a library like PapaParse
      const parsedData = Papa.parse(csvData, { header: true }).data;

      // Extract the necessary data for the chart (e.g., region names and ZHVI values)
      const regionnames = parsedData.map(row => row.RegionName);
      const zhviValues = parsedData.map(row => row[zhviinputdate]);

      // const zhviValues = parsedData.map(row => parseFloat(row[zhviinputdate.toString()]));
      
      // Create a line chart using Chart.js
      const zhvichartContainer = document.getElementById("zhvi-container");
      const zhviChartCanvas = document.getElementById('zhvi-chart');
      const zhviChart = new Chart(zhviChartCanvas, {
        type: "line",
        data: {
          labels: regionnames,
          datasets: [
            {
              label: "Home Value Index",
              data: zhviValues,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Region"
              }
            },
            y: {
              title: {
                display: true,
                text: "Home Value Index"
              }
            }
          }
        }
      });

      // // Render both charts simultaneously
      // Chart.render([chart, zhviChart]);
    })
    .catch(error => console.error("Error fetching or parsing CSV data:", error));
    // linearRegression();
}

document.addEventListener("DOMContentLoaded", function() {


}); 


class RentalProperty {
  constructor(
    purchase_price,
    rental_income,
    laundry_income,
    storage_income,
    misc_income,
    taxes,
    insurance,
    water_sewer,
    garbage,
    electric,
    gas,
    hoa_fees,
    lawn_snow,
    vacancy,
    repairs,
    capex,
    prop_management,
    mortgage,
    down_payment,
    closing_costs,
    rehab_budget,
    misc_other,
    ZHVI,
    salePrice,
    zhvidate
  ) {
    // Initialize the rental property object with the given parameters
    this.purchase_price = purchase_price;
    this.rental_income = rental_income;
    this.laundry_income = laundry_income;
    this.storage_income = storage_income;
    this.misc_income = misc_income;
    this.taxes = taxes;
    this.insurance = insurance;
    this.water_sewer = water_sewer;
    this.garbage = garbage;
    this.electric = electric;
    this.gas = gas;
    this.hoa_fees = hoa_fees;
    this.lawn_snow = lawn_snow;
    this.vacancy = vacancy;
    this.repairs = repairs;
    this.capex = capex;
    this.prop_management = prop_management;
    this.mortgage = mortgage;
    this.down_payment = down_payment;
    this.closing_costs = closing_costs;
    this.rehab_budget = rehab_budget;
    this.misc_other = misc_other;
    this.loan = this.purchase_price * 0.80;
    this.interest_rate = 2.5;
    this.mort_term = 360.0;
    this.down_pmt = this.purchase_price * 0.20;
    this.rental_income = this.rental_income;
    this.ins = (this.purchase_price / 10000) * 40;
    this.vac_all = ZHVI * 0.10 || 0;
    this.cl_cost = this.purchase_price * 0.035;
    this.salePrice = salePrice;
    this.zhvidate = zhvidate; 
  }

  // Other methods of the RentalProperty class...

  static fromUserInput() {
    // Get the form values
    var purchasePrice = parseFloat(document.getElementById("purchase-price").value);
    var rentalIncome = parseFloat(document.getElementById("rental-income").value);
    var laundryIncome = parseFloat(document.getElementById("laundry-income").value);
    var storageIncome = parseFloat(document.getElementById("storage-income").value);
    var miscIncome = parseFloat(document.getElementById("misc-income").value);
    var taxes = parseFloat(document.getElementById("taxes").value);
    var insurance = parseFloat(document.getElementById("insurance").value);
    var waterSewer = parseFloat(document.getElementById("water-sewer").value);
    var garbage = parseFloat(document.getElementById("garbage").value);
    var electric = parseFloat(document.getElementById("electric").value);
    var gas = parseFloat(document.getElementById("gas").value);
    var hoaFees = parseFloat(document.getElementById("hoa-fees").value);
    var lawnSnow = parseFloat(document.getElementById("lawn-snow").value);
    var vacancy = parseFloat(document.getElementById("vacancy").value);
    var repairs = parseFloat(document.getElementById("repairs").value);
    var capex = parseFloat(document.getElementById("capex").value);
    var propManagement = parseFloat(document.getElementById("prop-management").value);
    var mortgage = parseFloat(document.getElementById("mortgage").value);
    var downPayment = parseFloat(document.getElementById("down-payment").value);
    var closingCosts = parseFloat(document.getElementById("closing-costs").value);
    var rehabBudget = parseFloat(document.getElementById("rehab-budget").value);
    var miscOther = parseFloat(document.getElementById("misc-other").value);
    var zhvi = parseFloat(document.getElementById("zhvi").value) || null;
    var salePrice = parseFloat(document.getElementById("salePrice").value);
    var zhvidate = document.getElementById("zhvidate").value;
    
    // Create a new RentalProperty object
    var property = new RentalProperty(
      purchasePrice,
      rentalIncome,
      laundryIncome,
      storageIncome,
      miscIncome,
      taxes,
      insurance,
      waterSewer,
      garbage,
      electric,
      gas,
      hoaFees,
      lawnSnow,
      vacancy,
      repairs,
      capex,
      propManagement,
      mortgage,
      downPayment,
      closingCosts,
      rehabBudget,
      miscOther,
      zhvi,
      salePrice,
      zhvidate
    );

    // Return the created RentalProperty object
    return property;
  }

  calculateTotalMonthlyIncome() { 
    return (
      this.rental_income +
      this.laundry_income +
      this.storage_income +
      this.misc_income
    );
  }

  calculateTotalMonthlyExpenses() {
    return (
      this.taxes +
      this.insurance +
      this.water_sewer +
      this.garbage +
      this.electric +
      this.gas +
      this.hoa_fees +
      this.lawn_snow +
      this.vacancy +
      this.repairs +
      this.capex +
      this.prop_management +
      this.mortgage
    );
  }

  calculateAnnualCashFlow() {
    const totalMonthlyIncome = this.calculateTotalMonthlyIncome();
    const totalMonthlyExpenses = this.calculateTotalMonthlyExpenses();
    return (totalMonthlyIncome - totalMonthlyExpenses) * 12;
  }

  calculateCashOnCashReturn() {
    const totalInvestmentCost =
      this.down_payment +
      this.closing_costs +
      this.rehab_budget +
      this.misc_other;
    const annualCashFlow = this.calculateAnnualCashFlow();
    return (annualCashFlow / totalInvestmentCost) * 100;
  }

  calculateROI() {
    const roi = (this.salePrice - (this.purchase_price + this.repairs + this.cl_cost)) / (this.purchase_price + this.repairs + this.cl_cost);
    return roi;
  }

  calculateCashOnCashReturnCOC() {
    const mortPmt = this.loan * ((this.interest_rate / 12) * (1 + this.interest_rate / 12) ** this.mort_term) / ((1 + this.interest_rate / 12) ** this.mort_term - 1);
    const cashFlow = (12 * this.rental_income - (mortPmt + this.ins + this.vac_all)) / (this.down_pmt + this.cl_cost);
    return cashFlow;
  }

  displayMetrics(totalMonthlyIncome, totalMonthlyExpenses, annualCashFlow, cashOnCashReturn, roiValue) {
    // Get the element where you want to display the metrics
    var metricsContainer = document.getElementById("metrics-container");
  
    // Clear any previous metrics
    metricsContainer.innerHTML = "";
  
    // Create the metric elements
    var totalMonthlyIncomeElement = document.createElement("p");
    totalMonthlyIncomeElement.textContent = "Total Monthly Income: $" + totalMonthlyIncome.toFixed(2);
  
    var totalMonthlyExpensesElement = document.createElement("p");
    totalMonthlyExpensesElement.textContent = "Total Monthly Expenses: $" + totalMonthlyExpenses.toFixed(2);
  
    var annualCashFlowElement = document.createElement("p");
    annualCashFlowElement.textContent = "Annual Cash Flow: $" + annualCashFlow.toFixed(2);
  
    var cashOnCashReturnElement = document.createElement("p");
    cashOnCashReturnElement.textContent = "Cash-on-Cash Return: " + cashOnCashReturn.toFixed(2) + "%";
  
    var roiElement = document.createElement("p");
    roiElement.textContent = "Return on Investment: " + roiValue.toFixed(2);

    // Append the metric elements to the container
    metricsContainer.appendChild(totalMonthlyIncomeElement);
    metricsContainer.appendChild(totalMonthlyExpensesElement);
    metricsContainer.appendChild(annualCashFlowElement);
    metricsContainer.appendChild(cashOnCashReturnElement);
    metricsContainer.appendChild(roiElement);
  }
}


async function linearRegression() {
  // Read the CSV file into a DataFrame
  const df = await readCSV("lib/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv");

  // Perform feature engineering and create new features
  const dateColumns = df.columns.slice(5);

  function convertToDateTime(dateStr) {
    return new Date(dateStr);
  }

  df[dateColumns] = df[dateColumns].apply(convertToDateTime);

  df['Year'] = df[dateColumns[0]].map(date => date.getFullYear());
  df['Month'] = df[dateColumns[0]].map(date => date.getMonth() + 1);
  df['Day'] = df[dateColumns[0]].map(date => date.getDate());

  // Reshape the date columns into a single column
  const dfValues = df[dateColumns].values.flat();

  // Assign the reshaped values to the "Value" column
  df['Value'] = dfValues.slice(0, df.length);

  // Define the feature columns and target column
  const featureColumns = ['Year', 'Month', 'Day'];
  const targetColumn = 'Value';

  // Remove rows with missing values
  df.dropna(subset=[...featureColumns, targetColumn]);

  // Split the data into training and testing sets
  const X = df[featureColumns];
  const y = df[targetColumn];
  const [XTrain, XTest, yTrain, yTest] = sklearn.model_selection.train_test_split(X, y, { test_size: 0.2, random_state: 42 });

  // Perform any additional preprocessing steps
  // Example: Scale the feature values using StandardScaler
  const scaler = new sklearn.preprocessing.StandardScaler();
  const XTrainScaled = scaler.fit_transform(XTrain);
  const XTestScaled = scaler.transform(XTest);

  // Create a Linear Regression model
  const model = new sklearn.linear_model.LinearRegression();
  model.fit(XTrainScaled, yTrain);

  // Make predictions on the test set
  const yPred = model.predict(XTestScaled);

  // Calculate the R-squared score
  const r2 = sklearn.metrics.r2_score(yTest, yPred);
  console.log("R-squared score:", r2);
}



function analyzeProperty(event) { 
  event.preventDefault();

  // Create a new RentalProperty object from user input
  var property = RentalProperty.fromUserInput();

  // Calculate the financial metrics
  var totalMonthlyIncome = property.calculateTotalMonthlyIncome();
  var totalMonthlyExpenses = property.calculateTotalMonthlyExpenses();
  var annualCashFlow = property.calculateAnnualCashFlow();
  var cashOnCashReturn = property.calculateCashOnCashReturn();
  var roi = property.calculateROI(); 

  // Display the results
  property.displayMetrics(totalMonthlyIncome, totalMonthlyExpenses, annualCashFlow, cashOnCashReturn, roi);

// Create the input data object
var inputdata = {
  TotalMonthlyIncome: totalMonthlyIncome,
  TotalMonthlyExpenses: totalMonthlyExpenses,
  AnnualCashFlow: annualCashFlow,
  CashOnCashReturn: cashOnCashReturn,
  ROI: roi,
};
// Get the zhvi date 
var zhvidate = property.zhvidate;

  visualizeData(inputdata, zhvidate);
} 

// Add event listener to the form submit button
var analyzeButton = document.getElementById("analyze-button");
analyzeButton.addEventListener("click", analyzeProperty);
