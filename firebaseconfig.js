import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,get, push,update,remove,onValue,child } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBqmpvoO9ZQAN5LMQyGX5MHmzlCzvVwIp4",
  authDomain: "diet-plan-project.firebaseapp.com",
  databaseURL: "https://diet-plan-project-default-rtdb.firebaseio.com",
  projectId: "diet-plan-project",
  storageBucket: "diet-plan-project.appspot.com",
  messagingSenderId: "48233680711",
  appId: "1:48233680711:web:569d23dd0eaded8fcec662"
};

export const app = initializeApp(firebaseConfig);

export async function register(name, phoneNumber, email, password) {
  try {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + phoneNumber);

    // Check if user already exists
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      throw new Error('User already exists');
    }

    // Create new user
    await set(userRef, {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber
    });

    // Registration successful
    alert('Registration Successful');
  } catch (error) {
    // Registration failed
    alert(`Registration Failed: ${error.message}`);
  }
}


  export function userdetails(phone,name,bloodgroup,location,healthIssue,age,dob) {
    const dbb = getDatabase();
    set(ref(dbb, 'Userdetails/' + phone), {
        name: name,
        bloodgroup:bloodgroup,
        location: location,
        healthIssue:healthIssue,
        age:age,
        dob:dob
    });
    alert("Updated Successfull")
}



export function userreport(phone,plan) {
  const dbb = getDatabase();
  set(ref(dbb, 'userReport/' + phone), {
      plan: plan
  });
  alert("Report Generated Successfull")
}
