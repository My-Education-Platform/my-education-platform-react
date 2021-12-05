import {collection, getDocs, query, where, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../fbconfig";
import {ICourse, ILesson, IUser} from "../redux/types";
import {EStatus} from "../redux/enums";
import {IYouTubeComment} from "../components/Testimonials/types";

export const PublicRequests = {
    async getCourse(courseId: string): Promise<ICourse> {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as ICourse;
        } else {
            return {} as ICourse;
        }
    },
    async getCourses(direction: string): Promise<ICourse[]> {
        const q = query(collection(db, "courses"),
            where("published", "==", true),
            where("direction", "==", direction));

        const querySnapshot = await getDocs(q);

        const courses: ICourse[] = [];

        querySnapshot.forEach((doc) => {
            courses.push(doc.data() as ICourse);
        });

        if (courses.length > 0) {
            return courses;
        } else {
            return [];
        }
    },
    async getCoursesSize(direction: string): Promise<number> {
        const q = query(collection(db, "courses"),
            where("published", "==", true),
            where("direction", "==", direction));

        const querySnapshot = await getDocs(q);

        return querySnapshot.size;
    },
    async getLesson(lessonId: string): Promise<ILesson> {
        const lessonRef = doc(db, "lessons", lessonId);
        const lessonSnap = await getDoc(lessonRef);

        if (lessonSnap.exists()) {
            return lessonSnap.data() as ILesson;
        } else {
            return {} as ILesson;
        }
    },
    async getLessons(courseId: string) {
        const q = query(collection(db, "lessons"),
            where("courseId", "==", courseId))

        const querySnapshot = await getDocs(q);

        const lessons: ILesson[] = [];

        querySnapshot.forEach((doc) => {
            lessons.push(doc.data() as ILesson);
        });

        if (lessons.length > 0) {
            return lessons;
        } else {
            return [];
        }
    },
    async transformAccount(userId: string, status: string | number): Promise<IUser> {
        const userRef = doc(db, "users", userId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(userRef, {
            author: status === EStatus.author
        });

        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data() as IUser;
        } else {
            console.log("No such document!");
            return {} as IUser;
        }
    },
    async getTestimonials(videoId: string): Promise<IYouTubeComment[]> {
        const apiUrl = 'https://youtube.googleapis.com/youtube/v3/commentThreads'

        return fetch(`${apiUrl}?part=snippet&videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=5`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.items;
            });
    }
}
