"use client";

import css from "./FilterBar.module.css";
import { useCampersStore } from "@/lib/store/camperStore";

export default function FilterBar() {
 const filters = useCampersStore((s) => s.filters);
  const setFilters = useCampersStore((s) => s.setFilters);

  const setActiveFilters = useCampersStore((s) => s.setActiveFilters);
  const resetCampersList = useCampersStore((s) => s.resetCampersList);

  return (
    <aside className={css.aside}>
      {/* Location */}
      <div className={css.locationField}>
        <svg
          className={css.locationIcon}
          width="20"
          height="20"
          aria-hidden="true"
        >
          <use href="/sprite.svg#grey_map" />
        </svg>

        <input
          className={css.input}
          value={filters.location ?? ""}
          onChange={(e) =>
            setFilters({ location: e.target.value })
          }
          placeholder="Kyiv, Ukraine"
        />
      </div>

      <p className={css.filtersTitle}>Filters</p>

      {/* Vehicle equipment */}
      <div className={css.block}>
        <h3 className={css.sectionTitle}>Vehicle equipment</h3>

        <div className={css.grid}>
          <button
            type="button"
            className={`${css.tile} ${filters.AC ? css.active : ""}`}
            onClick={() => setFilters({ AC: !filters.AC })}
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#wind" />
            </svg>
            <span className={css.tileText}>AC</span>
          </button>

          <button
            type="button"
            className={`${css.tile} ${filters.transmission === "automatic" ? css.active : ""}`}

           onClick={() =>
  setFilters({
    transmission: filters.transmission === "automatic" ? "" : "automatic",
  })
}
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#diagrama" />
            </svg>
            <span className={css.tileText}>Automatic</span>
          </button>

          <button
            type="button"
            className={`${css.tile} ${filters.kitchen ? css.active : ""}`}
            onClick={() =>
              setFilters({ kitchen: !filters.kitchen })
            }
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#cup-hot" />
            </svg>
            <span className={css.tileText}>Kitchen</span>
          </button>

          <button
            type="button"
            className={`${css.tile} ${filters.TV ? css.active : ""}`}
            onClick={() => setFilters({ TV: !filters.TV })}
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#tv" />
            </svg>
            <span className={css.tileText}>TV</span>
          </button>

          <button
            type="button"
            className={`${css.tile} ${filters.bathroom ? css.active : ""}`}
            onClick={() =>
              setFilters({ bathroom: !filters.bathroom })
            }
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#ph_shower" />
            </svg>
            <span className={css.tileText}>Bathroom</span>
          </button>
        </div>
      </div>

      {/* Vehicle type */}
      <div className={css.block}>
        <h3 className={css.sectionTitle}>Vehicle type</h3>

        <div className={css.grid}>
          <button
            type="button"
            className={`${css.tile} ${
              filters.form === "panelTruck" ? css.active : ""
            }`}
            onClick={() =>
              setFilters({
                form:
                  filters.form === "panelTruck"
                    ? ""
                    : "panelTruck",
              })
            }
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#bi_grid-1x2" />
            </svg>
            <span className={css.tileText}>Van</span>
          </button>

          <button
            type="button"
            className={`${css.tile} ${
              filters.form === "fullyIntegrated"
                ? css.active
                : ""
            }`}
            onClick={() =>
              setFilters({
                form:
                  filters.form === "fullyIntegrated"
                    ? ""
                    : "fullyIntegrated",
              })
            }
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#bi_grid" />
            </svg>
            <span className={css.tileText}>Fully Integrated</span>
          </button>

          <button
            type="button"
            className={`${css.tile} ${
              filters.form === "alcove" ? css.active : ""
            }`}
            onClick={() =>
              setFilters({
                form:
                  filters.form === "alcove"
                    ? ""
                    : "alcove",
              })
            }
          >
            <svg className={css.tileIcon} width="32" height="32">
              <use href="/sprite.svg#bi_grid-3x3-gap" />
            </svg>
            <span className={css.tileText}>Alcove</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        className={css.searchBtn}
        onClick={() => {
          resetCampersList();
          setActiveFilters({ ...filters, page: 1 });
        }}
      >
        Search
      </button>
    </aside>
  );
}
