import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = (kursnamn) => {
    const ref = collection(firestore, "masterkurser") // Firebase creates this automatically
    let data = {
    kursnamn: kursnamn
    }

    try {
        addDoc(ref, data)
    } catch(err) {
    console.log(err)
    }
}
export default handleSubmit


// Read data from the database
database
  .ref("path/to/data")
  .once("value")
  .then((snapshot) => {
    const data = snapshot.val();
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });