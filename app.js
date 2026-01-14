
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
    
    ["装備①","装備②","装備③"].forEach(key=>{
      const wrap=document.createElement("div");
      const title=document.createElement("div");
      title.className="equip-name";
      title.textContent="";
      const sel=document.createElement("select");
      for(let i=1;i<=10;i++){
        const o=document.createElement("option");
        o.textContent="T"+i;
        sel.appendChild(o);
      }
      nameSel.addEventListener("change",()=>{
        const st=students.find(s=>s["名前"]===nameSel.value);
        title.textContent=st?st[key]:"";
      });
      nameSel.dispatchEvent(new Event("change"));
      wrap.appendChild(title);
      wrap.appendChild(sel);
      row.appendChild(wrap);
    });

    return row;
  }

  for(let i=0;i<4;i++) app.appendChild(createRow("STRIKER"));
  for(let i=0;i<2;i++) app.appendChild(createRow("SPECIAL"));
});
