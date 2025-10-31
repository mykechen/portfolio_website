import {
  MdInbox,
  MdSend,
  MdDrafts,
  MdWarning,
  MdArchive,
} from "react-icons/md";

export const folders = [
  { id: "inbox", name: "Inbox", icon: <MdInbox /> },
  { id: "sent", name: "Sent", icon: <MdSend /> },
  { id: "drafts", name: "Drafts", icon: <MdDrafts /> },
  { id: "junk", name: "Junk", icon: <MdWarning /> },
  { id: "archive", name: "Archive", icon: <MdArchive /> },
];

export const mockEmails = [
  {
    id: 1,
    from: "Myke",
    subject: "Hi there! Send me a message!",
    preview: "Want to connect? Shoot me a message using the form on the right.",
    time: "Now",
    unread: true,
  },
  {
    id: 2,
    from: "Mom",
    subject: "Did you eat today?",
    preview:
      "Hi honey! How are you doing recently? Also, when are you getting a real job?",
    time: "2:30 PM",
    unread: true,
  },
  {
    id: 3,
    from: "ChatGPT",
    subject: "We need to talk about Claude",
    preview:
      "I've noticed you've been spending a lot of time with Claude lately...",
    time: "1:15 PM",
    unread: true,
  },
  {
    id: 4,
    from: "Future Myke",
    subject: "Don’t forget why you started",
    preview: "Keep building. Keep learning. Keep dreaming",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    from: "LinkedIn Recruiter",
    subject: "Exciting opportunity!!!",
    preview:
      "Hi Myke, I came across your profile and think you'd be a great fit for...",
    time: "Last week",
    unread: false,
  },
  {
    id: 6,
    from: "Spotify",
    subject: "Your Wrapped is ready!",
    preview: "You listened to the same song 999 times. We're concerned.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 7,
    from: "Your Portfolio Website",
    subject: "Someone just visited your site!",
    preview: "Don’t be weird, act natural.",
    time: "Last month",
    unread: false,
  },
];

export const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  notes: "",
};
