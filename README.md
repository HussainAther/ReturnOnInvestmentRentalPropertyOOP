# W4 Friday Project - OOP Calculation of Rental Income (individual project)

Calculate the Return on Investment (ROI) for a rental property with API integration and feature engineering visualization given sample rental prices. Overall, we want to determine if you're making a good investment based on rental home Zillow Home Value Index (ZHVI).

Catch phrase: "Yare yare daze" 

File (Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv) source: https://www.zillow.com/research/data/

## Usage: 

Run the Jupyter Notebook with 
```
jupyter notebook --NotebookApp.iopub_data_rate_limit=1.0e10
```

to ensure we don't run into issues with data rate limit.

To run the web interface, we use Node.js to access the files properly:

*Initialize a new Node.js project**: Run the following command to initialize a new Node.js project in the current directory:

```
npm init -y
```

**Install a simple HTTP server**: Install the `http-server` package by running the following command:

```
npm install http-server
```

**Start the local server**: Run the following command to start the local development server:

```
npx http-server
```


#### TODO
* Still trying to get the Ridge Regression running using pandas-js. Until then, this part isn't necessary. 
You also need pandas.js for performing the Ridge Regression analysis. Install using

```
npm install pandas-js
```

or 

```
npm install git+https://github.com/StratoDem/pandas.js
```

**Access the website**: Open your web browser and visit the URL provided by the server (typically `http://localhost:8080`). You should see your HTML page being served.


## Web Interface
The project now includes a web interface that allows users to perform return on investment calculations in their web browser. The interface consists of the following files:

`index.html`
This file represents the structure and content of the web page. It contains the HTML elements, including forms and result displays, necessary for user interaction.

`style.css`
The style.css file contains the Cascading Style Sheets (CSS) rules that define the visual appearance and layout of the web page. It includes styles for various elements, such as fonts, colors, margins, and positioning, to create an aesthetically pleasing and user-friendly interface.

`script.js`
The script.js file contains the JavaScript code that provides interactivity and functionality to the web page. It includes event listeners, functions, and calculations related to the rental property ROI and cash-on-cash return. The JavaScript code interacts with the HTML elements, retrieves user input, performs calculations, and displays the results dynamically on the web page.

To use the web interface, open the index.html file in a web browser. Enter the required input values, such as purchase price, rental income, expenses, and Zillow Home Value Index (ZHVI), in the provided form fields. Upon submission, the JavaScript code will calculate and display the return on investment metrics, such as total monthly income, total monthly expenses, annual cash flow, and cash-on-cash return, in the designated result areas on the web page.

Feel free to explore and interact with the web interface to analyze different rental property scenarios and evaluate their financial viability.

