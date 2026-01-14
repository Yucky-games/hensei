
fetch("data/students.json").then(r=>r.json()).then(db=>{
  const app=document.getElementById("app");

  function createRow(type){
    const row=document.createElement("div");
    row.className="row";
    const label=document.createElement("div");
    label.className="label "+(type==="STRIKER"?"striker":"special");
    label.textContent=type;
    row.appendChild(label);

    const students=db
      .filter(s=>s["役割"]===type)
      .sort((a,b)=>a["生徒名"].localeCompare(b["生徒名"],"ja"));

    const nameSel=document.createElement("select");
    students.forEach(s=>{
      const o=document.createElement("option");
      o.value=s["生徒名"];
      o.textContent=s["生徒名"];
      nameSel.appendChild(o);
    });
    row.appendChild(nameSel);

    function skillSel(max){
      const s=document.createElement("select");
      for(let i=1;i<=max;i++){
        const o=document.createElement("option");
        o.textContent=i;
        s.appendChild(o);
      }
      const m=document.createElement("option");
      m.textContent="M";
      s.appendChild(m);
      return s;
    }

    row.appendChild(skillSel(4)); // EX
    row.appendChild(skillSel(9)); // NS
    row.appendChild(skillSel(9)); // PS
    row.appendChild(skillSel(9)); // SS

const skillLabels = ["EX", "NS", "PS", "SS"];

skillLabels.forEach(label => {
  const wrapper = document.createElement("div");
  wrapper.className = "control";

  const title = document.createElement("div");
  title.className = "label";
  title.textContent = label;

  const select = document.createElement("select");
  // select の option 生成処理

  wrapper.appendChild(title);
  wrapper.appendChild(select);
  controlsDiv.appendChild(wrapper);
});
    
 const equipNames = [
  student["装備①"],
  student["装備②"],
  student["装備③"]
];

equipNames.forEach((equipName, index) => {

  /* 装備名タイトル */
  const title = document.createElement("div");
  title.className = "equip-title";
  title.textContent = `装備${index + 1}：${equipName}`;

  /* T1〜T10 の行 */
  const row = document.createElement("div");
  row.className = "row-controls";

  for (let t = 1; t <= 10; t++) {
    const select = document.createElement("select");

    for (let i = 0; i <= 5; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = i === 0 ? "未強化" : `+${i}`;
      select.appendChild(opt);
    }

    row.appendChild(select);
  }

  container.appendChild(title);
  container.appendChild(row);
});

    
    return row;
  }

  for(let i=0;i<4;i++) app.appendChild(createRow("STRIKER"));
  for(let i=0;i<2;i++) app.appendChild(createRow("SPECIAL"));
});
