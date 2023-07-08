import { useState, useMemo } from "react";

export function useNoteWidgets() {
  const [sections, setSections] = useState([]);
  /*
    widgets structure
    [sectionId]:
      [layoutIndex]: widget
  */

  const [widgets, setWidgets] = useState({});

  const onSectionChange = (id, data) => {
    setSections((sections) =>
      sections.map((section) => {
        if (id !== section.id) {
          return section;
        }

        return {
          ...section,
          ...data,
        };
      })
    );
  };

  const onWidgetSelect = (type, layoutIndex, sectionId) => {
    setWidgets((widgets) => {
      let section = widgets[sectionId];
      if (!section) {
        section = {};
      }

      return {
        ...widgets,
        [sectionId]: {
          ...section,
          [layoutIndex]: {
            type,
            data: {},
          },
        },
      };
    });
  };

  const onWidgetUpdate = (widgetData, layoutIndex, sectionId) => {
    setWidgets((widgets) => ({
      ...widgets,
      [sectionId]: {
        ...widgets[sectionId],
        [layoutIndex]: {
          ...widgets[sectionId][layoutIndex],
          ...widgetData,
        },
      },
    }));
  };

  const hasWidgets = useMemo(() => Object.keys(widgets).length > 0, [widgets]);

  const addSection = () => {
    setSections((sections) => [
      ...sections,
      {
        layout_field: null,
        id: Math.random(),
      },
    ]);
  };

  const replaceWidgets = (sections, widgets) => {
    setSections(sections);
    setWidgets(widgets);
  };
  return {
    sections,
    widgets,
    onSectionChange,
    onWidgetSelect,
    onWidgetUpdate,
    hasWidgets,
    addSection,
    replaceWidgets,
  };
}
