fetch("data/students.json")
  .then(r => r.json())
  .then(db => {
    const app = document.getElementById("app");

    function createSelect(options) {
      const select = document.createElement("select");
      options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        select.appendChild(o);
      });
      return select;
    }

    function createControl(labelEl, select, extraClass = "") {
      const wrapper = document.createElement("div");
      wrapper.className = `control ${extraClass}`;

      wrapper.appendChild(labelEl);
      wrapper.appendChild(select);
      return wrapper;
    }

    function createTypeLabel(type) {
      const wrapper = document.createElement("div");
      wrapper.className = "control type";

      const spacer = document.createElement("div");
      spacer.className = "control-label";

      const body = document.createElement("div");
      body.className = `type-label ${type.toLowerCase()}`;
      body.textContent = type;

      wrapper.appendChild(spacer);
      wrapper.appendChild(body);
      return wrapper;
    }

    function createRow(type) {
      const row = document.createElement("div");
      row.className = "row";

      row.appendChild(createTypeLabel(type));

      const students = db
        .filter(s => s["役割"] === type)
        .sort((a, b) => a["生徒名"].localeCompare(b["生徒名"], "ja"));

      /* 生徒名 */
      const nameSelect = document.createElement("select");
      students.forEach(s => {
        const o = document.createElement("option");
        o.value = s["生徒名"];
        o.textContent = s["生徒名"];
        nameSelect.appendChild(o);
      });

      const nameLabel = document.createElement("div");
      nameLabel.className = "control-label";
      nameLabel.textContent = "生徒";

      row.appendChild(
        createControl(nameLabel, nameSelect, "student")
      );

      /* スキル */
      const skillDefs = [
        ["EX", ["1","2","3","4","M"]],
        ["NS", ["1","2","3","4","5","6","7","8","9","M"]],
        ["PS", ["1","2","3","4","5","6","7","8","9","M"]],
        ["SS", ["1","2","3","4","5","6","7","8","9","M"]],
      ];

      skillDefs.forEach(([labelText, opts]) => {
        const label = document.createElement("div");
        label.className = "control-label";
        label.textContent = labelText;

        row.appendChild(
          createControl(label, createSelect(opts), "skill")
        );
      });

      /* 装備 */
      const equipKeys = ["装備①", "装備②", "装備③"];
      const tierOptions = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"];
      const equipLabelEls = [];

      equipKeys.forEach((key, i) => {
        const label = document.createElement("div");
        label.className = "control-label";

        equipLabelEls.push({ key, label });

        row.appendChild(
          createControl(label, createSelect(tierOptions), "equip")
        );
      });

      /* 装備名更新処理 */
      function updateEquipLabels() {
        const selectedName = nameSelect.value;
        const student = db.find(s => s["生徒名"] === selectedName);
        if (!student) return;

        equipLabelEls.forEach(({ key, label }, i) => {
          label.textContent = {student[key]}`;
        });
      }

      nameSelect.addEventListener("change", updateEquipLabels);

      /* 初期表示 */
      updateEquipLabels();

      return row;
    }

    for (let i = 0; i < 4; i++) {
      app.appendChild(createRow("STRIKER"));
    }
    for (let i = 0; i < 2; i++) {
      app.appendChild(createRow("SPECIAL"));
    }
  });
