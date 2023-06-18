function visualizeApiData(data) {
  const apiVisualizationContainer = document.getElementById('api-visualization-container');
  const apiVisualization = document.getElementById('api-visualization-canvas');
  // Example: Create a bar chart using Chart.js library
  const chart = new Chart(apiVisualization, {
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
    fetch("Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")
    .then(response => response.text())
    .then(csvData => {
      // Parse the CSV data into an array of objects using a library like PapaParse
      const parsedData = Papa.parse(csvData, { header: true }).data;
      
      // Extract the necessary data for the chart (e.g., dates and ZHVI values)
      const dates = parsedData.map(row => row.Date);
      const zhviValues = parsedData.map(row => parseFloat(row.Zhvi));

      // Create a line chart using Chart.js
      const chartContainer = document.getElementById("zhvi-container").getContext("2d");
      const chartCanvas = document.getElementById('zhvi-chart');
      const lineChart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "ZHVI",
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
                text: "Date"
              }
            },
            y: {
              title: {
                display: true,
                text: "ZHVI"
              }
            }
          }
        }
      });
    })
    .catch(error => console.error("Error fetching or parsing CSV data:", error));

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
    ZHVI = null
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
      zhvi
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

  calculateROI(salePrice) {
    const roi = (salePrice - (this.purchase_price + this.repairs + this.cl_cost)) / (this.purchase_price + this.repairs + this.cl_cost);
    return roi;
  }

  calculateCashOnCashReturn() {
    const mortPmt = this.loan * ((this.interest_rate / 12) * (1 + this.interest_rate / 12) ** this.mort_term) / ((1 + this.interest_rate / 12) ** this.mort_term - 1);
    const cashFlow = (12 * this.rental_income - (mortPmt + this.ins + this.vac_all)) / (this.down_pmt + this.cl_cost);
    return cashFlow;
  }

  displayMetrics(totalMonthlyIncome, totalMonthlyExpenses, annualCashFlow, cashOnCashReturn) {
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
  
    // Append the metric elements to the container
    metricsContainer.appendChild(totalMonthlyIncomeElement);
    metricsContainer.appendChild(totalMonthlyExpensesElement);
    metricsContainer.appendChild(annualCashFlowElement);
    metricsContainer.appendChild(cashOnCashReturnElement);
  }
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

  // Display the results
  property.displayMetrics(totalMonthlyIncome, totalMonthlyExpenses, annualCashFlow, cashOnCashReturn);

  var roi = property.calculateROI(document.getElementById("prop-management").value); // Replace 'salePrice' with the actual sale price value

// Create the apiData object
var apiData = {
  TotalMonthlyIncome: totalMonthlyIncome,
  TotalMonthlyExpenses: totalMonthlyExpenses,
  AnnualCashFlow: annualCashFlow,
  CashOnCashReturn: cashOnCashReturn,
  ROI: roi
};

  visualizeApiData(apiData);
} 

// Add event listener to the form submit button
var analyzeButton = document.getElementById("analyze-button");
analyzeButton.addEventListener("click", analyzeProperty);