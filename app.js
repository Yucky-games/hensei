fetch("data/students.json")
  .then(r => r.json())
  .then(db => {
    const app = document.getElementById("app");

    function createRow(type) {
      const container = document.createElement("div");
      container.className = "row-container";

      /* STRIKER / SPECIAL ラベル */
      const typeLabel = document.createElement("div");
      typeLabel.className = "label " + (type === "STRIKER" ? "striker" : "special");
      typeLabel.textContent = type;
      container.appendChild(typeLabel);

      /* 対象生徒抽出 & 名前順 */
      const students = db
        .filter(s => s["役割"] === type)
        .sort((a, b) => a["生徒名"].localeCompare(b["生徒名"], "ja"));

      /* コントロール行 */
      const controls = document.createElement("div");
      controls.className = "controls";

      /* 生徒名 */
      const nameWrap = document.createElement("div");
      nameWrap.className = "control";

      const nameTitle = document.createElement("div");
      nameTitle.className = "control-title";
      nameTitle.textContent = "生徒";

      const nameSel = document.createElement("select");
      students.forEach(s => {
        const o = document.createElement("option");
        o.value = s["生徒名"];
        o.textContent = s["生徒名"];
        nameSel.appendChild(o);
      });

      nameWrap.appendChild(nameTitle);
      nameWrap.appendChild(nameSel);
      controls.appendChild(nameWrap);

      /* スキル共通生成 */
      function
