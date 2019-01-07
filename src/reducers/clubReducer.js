import {
  GET_GOLF_CLUBS,
  GET_GOLF_CLUB,
  ADD_GOLF_CLUB,
  CHANGE_STATUS_GOLF_CLUB,
  UPDATE_GOLF_CLUB,
  ADD_GOLF_COURSE,
  DELETE_GOLF_COURSE,
  UPDATE_GOLF_COURSE,
  GET_CLUB_RECENT_EVENT_ALBUM,
  UPLOAD_CLUB_IMAGE,
  UPLOAD_CLUB_FACILITY_FAIRWAY_IMAGE,
  DELETE_CLUB_FACILITY_FAIRWAY_IMAGE,
  ADD_CLUB_POLICY,
  UPDATE_CLUB_POLICY,
  DELETE_CLUB_POLICY,
  ADD_CLUB_ALBUM,
  ADD_CLUB_SERVICE,
  UPDATE_CLUB_SERVICE,
  DELETE_CLUB_SERVICE,
  ADD_CLUB_FACILITY,
  UPDATE_CLUB_FACILITY,
  DELETE_CLUB_FACILITY,
  GET_CLUB_ALBUM,
  UPLOAD_IMAGE_CLUB_ALBUM,
  DELETE_IMAGE_CLUB_ALBUM,
  ADD_CLUB_CONTACT,
  UPDATE_CLUB_CONTACT,
  DELETE_CLUB_CONTACT,
  ADD_CLUB_SOCIAL_MEDIA,
  UPDATE_CLUB_SOCIAL_MEDIA,
  DELETE_CLUB_SOCIAL_MEDIA,
  GET_ERRORS
} from "../actions/types";
import { stat } from "fs";

const initialState = {
  clubs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOLF_CLUBS:
      return {
        ...state,
        clubs: action.payload
      };
    case GET_GOLF_CLUB:
      return {
        ...state,
        club: action.payload
      };
    case ADD_GOLF_CLUB:
      return {
        ...state,
        clubs: [action.payload, ...state.clubs]
      };
    case CHANGE_STATUS_GOLF_CLUB:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        )
      };
    case ADD_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPDATE_GOLF_CLUB:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case DELETE_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPDATE_GOLF_COURSE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case GET_CLUB_RECENT_EVENT_ALBUM:
      return {
        ...state,
        club_recent_event_album: action.payload
      };
    case UPLOAD_CLUB_IMAGE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case UPLOAD_CLUB_FACILITY_FAIRWAY_IMAGE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    case DELETE_CLUB_FACILITY_FAIRWAY_IMAGE:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };

    case ADD_CLUB_ALBUM:
      return {
        ...state,
        clubs: state.clubs.map(club =>
          club._id === action.payload._id ? (club = action.payload) : club
        ),
        club: action.payload
      };
    // Club Policies
    case DELETE_CLUB_POLICY:
    case ADD_CLUB_POLICY:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            club.policies = action.payload;
          }
          return club;
        }),
        club: {
          ...state.club,
          policies: action.payload
        }
      };
    case UPDATE_CLUB_POLICY:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            const p = club.policies.map(policy => {
              return policy._id === action.payload._id
                ? (policy = action.payload)
                : policy;
            });
            club.policies = p;
          }
          return club;
        }),
        club: {
          ...state.club,
          policies: state.club.policies.map(policy =>
            policy._id === action.payload[0]._id
              ? (policy = action.payload[0])
              : policy
          )
        }
      };
    // Club Services
    case DELETE_CLUB_SERVICE:
    case ADD_CLUB_SERVICE:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            club.services = action.payload;
          }
          return club;
        }),
        club: {
          ...state.club,
          services: action.payload
        }
      };
    case UPDATE_CLUB_SERVICE:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            const s = club.services.map(service => {
              return service._id === action.payload._id
                ? (service = action.payload)
                : service;
            });
            club.services = s;
          }
          return club;
        }),
        club: {
          ...state.club,
          services: state.club.services.map(service =>
            service._id === action.payload[0]._id
              ? (service = action.payload[0])
              : service
          )
        }
      };
    // Club Services
    case DELETE_CLUB_FACILITY:
    case ADD_CLUB_FACILITY:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            club.facilities = action.payload;
          }
          return club;
        }),
        club: {
          ...state.club,
          facilities: action.payload
        }
      };
    case UPDATE_CLUB_FACILITY:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            const s = club.facilities.map(facility => {
              return facility._id === action.payload._id
                ? (facility = action.payload)
                : facility;
            });
            club.facilities = s;
          }
          return club;
        }),
        club: {
          ...state.club,
          facilities: state.club.facilities.map(facility =>
            facility._id === action.payload[0]._id
              ? (facility = action.payload[0])
              : facility
          )
        }
      };
    case GET_CLUB_ALBUM:
    case DELETE_IMAGE_CLUB_ALBUM:
    case UPLOAD_IMAGE_CLUB_ALBUM:
      return {
        ...state,
        album: action.payload
      };
    case DELETE_CLUB_CONTACT:
    case ADD_CLUB_CONTACT:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            club.contact = action.payload;
          }
          return club;
        }),
        club: {
          ...state.club,
          contact: action.payload
        }
      };
    case UPDATE_CLUB_CONTACT:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            const c = club.contact.map(contact => {
              return contact._id === action.payload._id
                ? (contact = action.payload)
                : contact;
            });
            club.contact = c;
          }
          return club;
        }),
        club: {
          ...state.club,
          contact: state.club.contact.map(contact =>
            contact._id === action.payload[0]._id
              ? (contact = action.payload[0])
              : contact
          )
        }
      };
    case DELETE_CLUB_SOCIAL_MEDIA:
    case ADD_CLUB_SOCIAL_MEDIA:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            club.social_media = action.payload;
          }
          return club;
        }),
        club: {
          ...state.club,
          social_media: action.payload
        }
      };
    case UPDATE_CLUB_SOCIAL_MEDIA:
      return {
        ...state,
        clubs: state.clubs.map(club => {
          if (club._id === action.payload.clubid) {
            delete action.payload.clubid;
            const c = club.social_media.map(sm => {
              return sm._id === action.payload._id ? (sm = action.payload) : sm;
            });
            club.social_media = c;
          }
          return club;
        }),
        club: {
          ...state.club,
          social_media: state.club.social_media.map(sm =>
            sm._id === action.payload[0]._id ? (sm = action.payload[0]) : sm
          )
        }
      };
    default:
      return state;
  }
}
