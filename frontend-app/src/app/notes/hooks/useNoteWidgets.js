import { useState, useMemo } from "react";

const getEmptySection = () => ({
  layout_field: null,
  id: Math.random(),
});

const setSectionBefore = (
  sections,
  section,
  newSection = getEmptySection()
) => {
  const index = sections.findIndex((sec) => sec.id === section.id);
  const first = sections.slice(0, index);
  const second = sections.slice(index);
  return [...first, newSection, ...second];
};
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
    setSections((sections) => [...sections, getEmptySection()]);
  };

  const replaceWidgets = (sections, widgets) => {
    setSections(sections);
    setWidgets(widgets);
  };

  const onAddAfter = (section) => {
    setSections(setSectionBefore(sections, section));
  };
  const onDelete = (section) => {
    setSections((sections) => sections.filter((sec) => sec.id !== section.id));
  };

  const onDuplicate = ({ _id, ...section }) => {
    const newSection = {
      ...section,
      widgets: [],
      id: Math.random(),
    };

    if (widgets[_id]) {
      const sectionWidgets = Object.entries(widgets[_id]).reduce(
        (acc, [index, { _id, ...widget }]) => {
          return {
            ...acc,
            [index]: {
              ...widget,
              section_id: newSection.id,
              id: Math.random(),
            },
          };
        },
        {}
      );

      setWidgets((widgets) => ({
        ...widgets,
        [newSection.id]: sectionWidgets,
      }));
    }
    setSections(setSectionBefore(sections, section, newSection));
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
    onDelete,
    onAddAfter,
    onDuplicate,
  };
}
