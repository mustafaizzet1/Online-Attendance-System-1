const courses = [[
  { id: 1206, name: "CME 1206 TEKNİK İNGİLİZCE" },
  { id: 2203, name: "CME 2203 DEVRELER VE ELEKTRONİK SİSTEM" },
  { id: 3208, name: "CME 3208 GÖMÜLÜ SİSTEMLER VE AĞLAR" },
  { id: 2203, name: "CME 2203 DEVRELER VE ELEKTRONİK SİSTEM" },
  { id: 3208, name: "CME 3208 GÖMÜLÜ SİSTEMLER VE AĞLAR" },
  { id: 2203, name: "CME 2203 DEVRELER VE ELEKTRONİK SİSTEM" },
  { id: 3208, name: "CME 3208 GÖMÜLÜ SİSTEMLER VE AĞLAR" },
  { id: 2203, name: "CME 2203 DEVRELER VE ELEKTRONİK SİSTEM" },
  { id: 3208, name: "CME 3208 GÖMÜLÜ SİSTEMLER VE AĞLAR" },
  { id: 2203, name: "CME 2203 DEVRELER VE ELEKTRONİK SİSTEM" },
  { id: 3208, name: "CME 3208 GÖMÜLÜ SİSTEMLER VE AĞLAR" },
  { id: 2203, name: "CME 2203 DEVRELER VE ELEKTRONİK SİSTEM" },
  { id: 3208, name: "CME 3208 GÖMÜLÜ SİSTEMLER VE AĞLAR" },
  { id: 4436, name: "CME 4436 NESNELERIN INTERNETI" }
],[]];



exports.courses = async (req, res, next) => {
  try {
     
    res.json(courses[0]);
  } catch (error) {
    next(error);
  }
};