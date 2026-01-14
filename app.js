fetch("data/students.json")
  .then(res => res.json())
  .then(db => {
    const app = document.getElementById("app");

    function createRow(type) {
      const container = document.createElement("div");
      container.className = "row-container";

      /* STRIKER / SPECIAL */
      const typeLabel = document.createElement("div");
      typeLabel.className = "type-label " + (type === "STRIKER" ? "striker" : "special");
      typeLabel.textContent = type;
      container.appendChild(typeLabel);

      const students = db
        .filter(s => s["役割"] === type)
        .sort((a, b) => a["生徒名"].localeCompare(b["生徒名"], "ja"));

      /* ===== 操作行 ===== */
      const controls = document.createElement("div");
      controls.className = "controls";

      /* 生徒名 */
      const nameWrap = document.createElement("div");
      nameWrap.className = "control";

      const nameTitle = document.createElement("div");
      nameTitle.className = "control-title";
      nameTitle.textContent = "生徒";

      const nameSelect = document.createElement("select");
      students.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s["生徒名"];
        opt.textContent = s["生徒名"];
        nameSelect.appendChild(opt);
      });

      nameWrap.appendChild(nameTitle);
      nameWrap.appendChild(nameSelect);
      controls.appendChild(nameWrap);

      /* スキル */
      function createSkill(label, max) {
        const wrap = document.createElement("div");
        wrap.className = "control";

        const title = document.createElement("div");
        title.className = "control-title";
        title.textContent = label;

        const select = document.createElement("select");
        for (let i = 1; i <= max; i++) {
          const o = document.createElement("option");
          o.textContent = i;
          select.appendChild(o);
        }
        const m = document.createElement("option");
        m.textContent = "M";
        select.appendChild(m);

        wrap.appendChild(title);
        wrap.appendChild(select);
        return wrap;
      }

      controls.appendChild(createSkill("EX", 4));
      controls.appendChild(createSkill("NS", 9));
      controls.appendChild(createSkill("PS", 9));
      controls.appendChild(createSkill("SS", 9));

      container.appendChild(controls);

      /* ===== 装備：各1プルダウン ===== */
      const equipArea = document.createElement("div");
      equipArea.className = "equip-area";

      const equipTitles = [];

      ["装備①", "装備②", "装備③"].forEach((key, index) => {
        const wrap = document.createElement("div");
        wrap.className = "equip-control";

        const title = document.createElement("div");
        title.className = "equip-title";
        equipTitles[index] = title;

        const select = document.createElement("select");
        for (let t = 1; t <= 10; t++) {
          const opt = document.createElement("option");
          opt.value = `T${t}`;
          opt.textContent = `T${t}`;
          select.appendChild(opt);
        }

        wrap.appendChild(title);
        wrap.appendChild(select);
        equipArea.appendChild(wrap);
      });

      container.appendChild(equipArea);

      /* 生徒変更 → 装備名更新 */
      function updateEquipNames() {
        const student = students.find(s => s["生徒名"] === nameSelect.value);
        if (!student) return;

        equipTitles[0].textContent = `装備①：${student["装備①"] || ""}`;
        equipTitles[1].textContent = `装備②：${student["装備②"] || ""}`;
        equipTitles[2].textContent = `装備③：${student["装備③"] || ""}`;
      }

      nameSelect.addEventListener("change", updateEquipNames);
      updateEquipNames();

      return container;
    }

    for (let i = 0; i < 4; i++) app.appendChild(createRow("STRIKER"));
    for (let i = 0; i < 2; i++) app.appendChild(createRow("SPECIAL"));
  });
