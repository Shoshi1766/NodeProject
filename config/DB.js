import {mongoose} from 'mongoose';

//התחברות למונגו אטלס
export function connect(){
    //התוספות שנכתבו זה בגלל בעיה מסוימת וזה פתר אותה ניתן ע"י gpt
    return mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

