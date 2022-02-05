export default interface ClassCharts {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  display_behaviour: boolean;
  display_parent_behaviour: boolean;
  display_homework: boolean;
  display_rewards: boolean;
  display_detentions: boolean;
  display_report_cards: boolean;
  display_classes: boolean;
  display_announcements: boolean;
  display_attendance: boolean;
  display_attendance_type: string;
  display_attendance_percentage: boolean;
  display_activity: boolean;
  display_mental_health: boolean;
  display_timetable: boolean;
  is_disabled: boolean;
  display_two_way_communications: boolean;
  display_absences: boolean;
  can_upload_attachments: string | null;
  display_event_badges: boolean;
  display_avatars: boolean;
  display_concern_submission: boolean;
  display_custom_fields: boolean;
  pupil_concerns_help_text: string;
  allow_pupils_add_timetable_notes: boolean;
  announcements_count: number;
  messages_count: number;
  pusher_channel_name: string;
  has_birthday: boolean;
  has_new_survey: boolean;
  survey_id: number | null;
  detention_alias_plural_uc: string;
  homework: Array<Homework>;
  behaviour: Behaviour;
  activity: Array<Activity_point>;
  detentions: Array<Detention>;
}

export interface Homework {
  completion_time_unit: string;
  completion_time_value: string;
  description: string;
  due_date: string;
  homework_type: string;
  id: number;
  issue_date: string;
  lesson: string;
  meta_title: string;
  publish_time: string;
  status: {
    allow_attachments: "yes" | "no";
    attachments: any;
    first_seen_date: string;
    has_feedback: boolean;
    id: number;
    last_seen_date: string;
    mark: any;
    mark_relative: null | number;
    state: null | string;
    ticked: "yes" | "no";
  };
  subject: string;
  teacher: string;
  title: string;
  validated_attachments: Array<{
    file: string;
    file_name: string;
    id: number;
    validated_file: string;
  }>;
  validated_links: any;
}

export interface Behaviour {
  timeline: Array<Behaviour_timeline>;
  positive_reasons: any;
  negative_reasons: any;
  other_positive: any;
  other_negative: any;
  other_positive_count: any;
  other_negactive_count: any;
}

export interface Behaviour_timeline {
  positive: number;
  negative: number;
  name: string;
  start: string;
  end: string;
}

export interface Activity_point {
  id: number;
  type: string;
  polarity: string;
  reason: string;
  score: number;
  timestamp: string;
  timestamp_custom_time: string | null;
  style: {
    border_color: string | null;
    custom_class: string | null;
  };
  pupil_name: string;
  lesson_name: string;
  teacher_name: string;
  room_name: string | null;
  note: string;
  _can_delete: string;
  detention_date: string | null;
  detention_time: string | null;
  detention_location: string | null;
  detention_type: string | null;
}

export interface Detention {
  id: number;
  attended: "yes" | "no" | "upscaled" | "pending";
  date: string | null;
  length: number | null;
  location: string | null;
  notes: string | null;
  time: string | null;
  pupil: {
    id: number;
    first_name: string;
    last_name: string;
    school: {
      opt_notes_names: "yes" | "no";
      opt_notes_comments: "yes" | "no";
      opt_notes_comments_pupils: "yes" | "no";
    };
  };
  lesson: {
    id: number;
    name: string;
    subject: {
      id: number;
      name: string;
    };
  };
  lesson_pupil_behaviour: {
    reason: string;
  };
  teacher: {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
  };
  detention_type: {
    name: string;
  };
}
