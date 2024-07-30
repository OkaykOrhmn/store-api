const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const validationMessages = {
  requied: "این فیلد اجباری ست",
  minLength: (n: number) => `این فیلد باید حداقل ${farsiDigits[n]} حرف باشد`,
  isInt: "این فیلد باید عدد صحیح باشد",
  isEmail: "این فیلد باید ایمیل باشد",
  isDate: "باشد yyyy-mm-dd این فیلد باید در فرمت",
  isBool: "باشد false یا true مقدار این فیلد باید",
  isArray: "این فیلد باید یک لیست باشد",
  LIMIT_FILE_SIZE: "محدودیت حجم فایل",
  WRONG_FILE_TYPE: "نوع فایل اشتباه است",
  LIMIT_UNEXPECTED_FILE: "محدودیت فایل غیر منتظره",
  isMobilePhone:
    "این فیلد باید یک شماره موبایل معتبر باشد(مثال : ۰۹۲۱ ۰۰۰۰ ۰۰۰)",
};
