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

    function createControl(labelText, select, extraClass = "") {
      const wrapper = document.createElement("div");
      wrapper.className = `control ${extraClass}`;

      const label = document.createElement("div");
      label.className = "control-label";
      label.textContent = labelText;

      wrapper.appendChild(label);
      wrapper.appendChild(select);
      return wrapper;
    }

    function createRow(type) {
      const row = document.createElement("div");
      row.className = "row";

      const students = db
        .filter(s => s["役割"] === type)
        .sort((a, b) => a["生徒名"].localeCompare(b["生徒名"], "ja"));

      const student = students[0]; // 初期表示用

      /* 生徒名 */
      const nameSelect = document.createElement("select");
      students.forEach(s => {
        const o = document.createElement("option");
        o.value = s["生徒名"];
        o.textContent = s["生徒名"];
        nameSelect.appendChild(o);
      });

      row.appendChild(
        createControl("生徒", nameSelect, "student")
      );

      /* スキル */
      const skillDefs = [
        ["EX", ["1", "2", "3", "4", "M"]],
        ["NS", ["1","2","3","4","5","6","7","8","9","M"]],
        ["PS", ["1","2","3","4","5","6","7","8","9","M"]],
        ["SS", ["1","2","3","4","5","6","7","8","9","M"]],
      ];

      skillDefs.forEach(([label, opts]) => {
        row.appendChild(
          createControl(label, createSelect(opts), "skill")
        );
      });

      /* 装備 */
      const equipKeys = ["装備①", "装備②", "装備③"];
      const tierOptions = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10"];

      equipKeys.forEach((key, i) => {
        const label = `装備${i + 1}：${student[key]}`;
        row.appendChild(
          createControl(label, createSelect(tierOptions), "equip")
        );
      });

      return row;
    }

    /* STRIKER */
    for (let i = 0; i < 4; i++) {
      app.appendChild(createRow("STRIKER"));
    }

    /* SPECIAL */
    for (let i = 0; i < 2; i++) {
      app.appendChild(createRow("SPECIAL"));
    }
  });
