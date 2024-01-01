//@ts-nocheck
import { faker } from '@faker-js/faker';
import * as csvWriter from 'csv-writer';

export const categoriesInfo = {
    "food": {
        "icon": "🍔",
        "color": "#8b0000",
        "name": "Food"
    },
    "transportation": {
        "icon": "🚗",
        "color": "#696969",
        "name": "Transportation"
    },
    "housing": {
        "icon": "🏠",
        "color": "#800080",
        "name": "Housing"
    },
    "utilities": {
        "icon": "💡",
        "color": "#000080",
        "name": "Utilities"
    },
    "clothing": {
        "icon": "👕",
        "color": "#2e8b57",
        "name": "Clothing"
    },
    "healthcare": {
        "icon": "🏥",
        "color": "#800000",
        "name": "Healthcare"
    },
    "personal": {
        "icon": "💼",
        "color": "#556b2f",
        "name": "Personal"
    },
    "education": {
        "icon": "📚",
        "color": "#483d8b",
        "name": "Education"
    },
    "entertainment": {
        "icon": "🎥",
        "color": "#2f4f4f",
        "name": "Entertainment"
    },
    "miscellaneous": {
        "icon": "📦",
        "color": "#808080",
        "name": "Miscellaneous"
    },
    "income": {
        "icon": "💰",
        "color": "#006400",
        "name": "Income"
    },
    "salary": {
        "icon": "💼",
        "color": "#556b2f",
        "name": "Salary"
    },
    "freelance": {
        "icon": "💼",
        "color": "#556b2f",
        "name": "Freelance"
    },
    "investment": {
        "icon": "💹",
        "color": "#2e8b57",
        "name": "Investment"
    },
    "rent": {
        "icon": "🏠",
        "color": "#800080",
        "name": "Rent"
    },
    "gift": {
        "icon": "🎁",
        "color": "#2f4f4f",
        "name": "Gift"
    },
    "savings": {
        "icon": "💰",
        "color": "#006400",
        "name": "Savings"
    }
};

const categoryExamples = {
    "food": ["Groceries", "Restaurant", "Fast Food", "Coffee Shop", "Takeout", "Bakery", "Food Delivery", "Supermarket", "Cafeteria", "Food Truck"],
    "transportation": ["Gasoline", "Public Transportation", "Uber Ride", "Taxi Fare", "Car Rental", "Parking Fee", "Toll Road", "Bicycle Repair", "Train Ticket", "Subway Pass"],
    "housing": ["Rent", "Mortgage", "Property Tax", "Home Insurance", "Apartment Deposit", "Furniture Purchase", "Home Repairs", "Utilities Deposit", "HOA Fees", "Storage Unit Rent"],
    "utilities": ["Electricity", "Water", "Natural Gas", "Internet", "Cable TV", "Phone Bill", "Garbage Collection", "Sewer Service", "Heating Oil", "Propane"],
    "clothing": ["Clothing Store", "Shoes", "Accessories", "Laundry Service", "Dry Cleaning", "Tailoring", "Sportswear", "Lingerie", "Uniforms", "Winter Coats"],
    "healthcare": ["Doctor Visit", "Prescription Medication", "Dental Checkup", "Eye Exam", "Health Insurance", "Medical Supplies", "Therapist Session", "Medical Tests", "Emergency Room", "Vitamins/Supplements"],
    "personal": ["Gym Membership", "Haircut", "Spa Day", "Cosmetics", "Tattoo/Piercing", "Massage", "Pet Grooming", "Laundry Detergent", "Toiletries", "Personal Care Products"],
    "education": ["Tuition", "Books", "School Supplies", "Tutoring", "Student Loan Payment", "Educational Software", "Exam Fees", "Online Courses", "Educational Seminars", "Workshops"],
    "entertainment": ["Movie Tickets", "Concert Tickets", "Theme Park Admission", "Streaming Services", "Video Games", "Concerts", "Theater Shows", "Museum Visits", "Amusement Park", "Hobbies"],
    "miscellaneous": ["ATM Withdrawal", "Bank Fees", "Shipping Costs", "Magazine Subscription", "Donations", "Stamps/Postage", "Lottery Tickets", "Recreation", "Pawn Shop", "Lost Property"],
    "income": ["Salary", "Freelance Income", "Investment Income", "Rent Income", "Business Income", "Royalties", "Stock Dividends", "Interest Income", "Online Sales", "Consulting Fees"],
    "salary": ["Monthly Salary", "Bi-weekly Salary", "Annual Bonus", "Overtime Pay", "Commissions", "Employee Benefits", "Sales Bonuses", "Year-End Bonus", "Holiday Pay", "Employee Stock Options"],
    "freelance": ["Client Payment", "Project Fee", "Consulting Invoice", "Freelance Gig", "Freelance Commission", "Contract Work", "Online Freelancing", "Art Commission", "Web Design Project", "Copywriting"],
    "investment": ["Stock Dividends", "Capital Gains", "Real Estate Income", "Mutual Funds Dividends", "Interest on Investments", "Rental Property Income", "Royalty Income", "Selling Investments", "Peer-to-Peer Lending", "Certificates of Deposit (CD)"],
    "rent": ["Apartment Rent", "House Rent", "Office Space Rent", "Storage Unit Rent", "Vacation Rental", "Room Rental", "Property Lease", "Commercial Space Rent", "Retail Space Rent", "Parking Space Rent"],
    "utilities_income": ["Electricity Rebate", "Water Refund", "Gas Rebate", "Internet Reimbursement", "Cable TV Credit", "Phone Bill Refund", "Garbage Collection Refund", "Sewer Service Reimbursement", "Heating Oil Rebate", "Propane Credit"],
    "gift": ["Birthday Gift", "Wedding Gift", "Christmas Gift", "Gift Cards", "Gift Vouchers", "Gift Money", "Anniversary Gift", "Baby Shower Gift", "Graduation Gift", "Surprise Gift"],
    "savings": ["Emergency Fund Deposit", "401(k) Contribution", "Investment Account Deposit", "Savings Account Interest", "Retirement Fund Contribution", "College Savings Deposit", "IRA Contribution", "Vacation Fund Savings", "Rainy Day Fund Deposit", "High-Yield Savings Account Interest"]
};

export const categories = ['food', 'transportation', 'housing', 'utilities', 'clothing', 'healthcare', 'personal', 'education', 'entertainment', 'miscellaneous', 'income', 'salary', 'freelance', 'investment', 'rent', 'gift', 'savings'];
const types = ['income', 'expense'];

export function generateSeedTransactions(num = 400) {
    let idCounter = 1;
    const seedTransactions = Array.from({ length: num }, () => {
        const category = faker.helpers.arrayElement(categories);
        const type = faker.helpers.arrayElement(types);
        const amount = type === 'income'
            ? faker.number.float({ min: 500, max: 1000, precision: 2 })
            : faker.number.float({ min: 0, max: 500, precision: 2 });

        return {
            category: category,
            description: faker.helpers.arrayElement(categoryExamples[category]),
            amount: amount,
            type: type,
            date: faker.date.recent({
                days: 365,
            }).getTime(),
        };
    });

    return seedTransactions;
}

async function createCsvFile() {
    const transactions = generateSeedTransactions(2000);
    const csvWriterInstance = csvWriter.createObjectCsvWriter({
        path: 'seed.csv',
        header: [
            { id: 'category', title: 'CATEGORY' },
            { id: 'description', title: 'DESCRIPTION' },
            { id: 'amount', title: 'AMOUNT' },
            { id: 'type', title: 'TYPE' },
            { id: 'date', title: 'DATE' },
        ]
    });

    await csvWriterInstance.writeRecords(transactions);
    console.log('CSV file was written successfully');
}


createCsvFile()