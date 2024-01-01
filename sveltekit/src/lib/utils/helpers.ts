import { clsx, type ClassValue } from "clsx";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that converts a style object to a string.
 *
 * @param style - The style object to convert
 * @returns The style object as a string
 */
export function styleToString(
  style: Record<string, number | string | undefined>
): string {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === undefined) return str;
    return str + `${key}:${style[key]};`;
  }, "");
}

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Returns an array of entries sorted by key.
 */
export function sortedEntries<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj).sort(([a], [b]) => a.localeCompare(b));
}

export type Tree = {
  [key: string]: Tree | string;
};

type ConstructTreeArgs<T> = {
  paths: Record<string, T>;
  basePath: string;
};

export function constructTree<T>({
  paths,
  basePath,
}: ConstructTreeArgs<T>): Tree {
  const tree: Tree = {};

  for (const path in paths) {
    const cleanPath = path.replace(basePath, "").replace("/+page.svelte", "");
    const segments = cleanPath.split("/");

    let currentLevel = tree;
    for (const segment of segments.slice(0, -1)) {
      if (!(segment in currentLevel)) {
        currentLevel[segment] = {} as Tree;
      }
      currentLevel = currentLevel[segment] as Tree;
    }

    const lastSegment = segments[segments.length - 1];
    currentLevel[lastSegment] = `/${cleanPath}`;
  }

  return tree;
}

export function getFromTree(path: string, tree: Tree) {
  const segments = path.split("/");

  let currentLevel = tree;
  for (const segment of segments) {
    if (!(segment in currentLevel)) {
      return null;
    }
    currentLevel = currentLevel[segment] as Tree;
  }

  return currentLevel;
}

type IsInTreeArgs = {
  path: string;
  tree: Tree;
};

export function isInTree({ path, tree }: IsInTreeArgs) {
  const segments = path.split("/");

  let currentLevel = tree;
  for (const segment of segments) {
    if (!(segment in currentLevel)) {
      return false;
    }
    currentLevel = currentLevel[segment] as Tree;
  }

  return true;
}

const scaleConversion = (
  valueA: number,
  scaleA: [number, number],
  scaleB: [number, number]
) => {
  const [minA, maxA] = scaleA;
  const [minB, maxB] = scaleB;

  const percentage = (valueA - minA) / (maxA - minA);
  const valueB = percentage * (maxB - minB) + minB;

  return valueB;
};

type FlyAndScaleOptions = {
  y: number;
  start: number;
  duration?: number;
};
export const flyAndScale = (
  node: HTMLElement,
  options: FlyAndScaleOptions
): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;

  return {
    duration: options.duration ?? 150,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [options.y, 0]);
      const scale = scaleConversion(t, [0, 1], [options.start, 1]);

      return styleToString({
        transform: `${transform} translate3d(0, ${y}px, 0) scale(${scale})`,
        opacity: t,
      });
    },
    easing: cubicOut,
  };
};

export const formatStr = (s: string) => {
  // Capitalize and remove dashes
  return s
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};


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

export const categoryExamples = {
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
