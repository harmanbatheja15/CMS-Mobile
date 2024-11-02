enum MigrationStatus {
    NOT_MIGRATED,
    IN_PROGRESS,
    MIGRATED,
    MIGRATION_ERROR,
}

export interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: string;
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    token: string;
    sessions: Session[];
    purchases: UserPurchases[];
    videoProgress: VideoProgress[];
    comments: Comment[];
    votes: Vote[];
    discordConect: DiscordConnect[];
    disableDrm: boolean;
    bunnyProxyEnabled: boolean;
    bookmarks: Bookmark[];
    appxUserId: string;
    appxUsername: string;
    questions: Question[];
    answers: Answer[];
    certificate: Certificate[];
    upiIds: UpiId[];
    solanaAddresses: SolanaAddress[];
    githubUsername: GitHubLink;
    // password: string;
}

interface UpiId {
    id: number;
    value: string;
    userId: string;
    user: User;
}

interface GitHubLink {
    id: string;
    userId: string;
    user: User;
    githubId: string;
    username: string;
    avatarUrl?: string | null;
    access_token: string;
    profileUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface SolanaAddress {
    id: number;
    value: string;
    userId: string;
    user: User;
}

export interface Answer {
    id: number;
    content: string;
    createdAt: Date;
    question: Question;
    questionId: number;
    author: User;
    authorId: string;
    votes: Vote[];
    upvotes: number;
    downvotes: number;
    totalanswers: number;
    parentId: number | null;
    responses: Answer[];
    parent: Answer | null;
    updatedAt: Date;
}

export interface DiscordConnect {
    id: string;
    username: string;
    discordId: string;
    userId: string;
    user: User;
}

export interface DiscordConnectBulk {
    id: string;
    username: string;
    discordId: string;
    userId: string;
    cohortId: string;
}

export interface Question {
    id: number;
    title: string;
    content: string;
    slug: string;
    createdAt: Date;
    author: User;
    authorId: string;
    upvotes: number;
    downvotes: number;
    totalanswers: number;
    answers: Answer[];
    votes: Vote[];
    tags: string[];
    updatedAt: Date;
}

export enum CommentType {
    DEFAULT = 'DEFAULT',
}

export interface Vote {
    id: number;
    commentId: number;
    userId: string;
    type: 'UPVOTE' | 'DOWNVOTE';
    createdAt: Date;
}

export interface Comment {
    id: number;
    content: string;
    commentType: CommentType;
    approved: boolean;
    contentId: number;
    commentedOn: Content;
    parentId: number | null;
    parent: Comment | null;
    children: Comment[];
    userId: string;
    user: User;
    upvotes: number;
    downvotes: number;
    repliesCount: number;
    createdAt: Date;
    updatedAt: Date;
    votes: Vote[];
    isPinned: boolean;
}

export interface Course {
    id: number;
    appxCourseId: string;
    discordRoleId: string;
    title: string;
    imageUrl: string;
    description: string;
    openToEveryone: boolean;
    slug: string;
    discordOauthUrl?: string;
    content: CourseContent[];
    purchasedBy: UserPurchases[];
    certificate: Certificate[];
    certIssued: boolean;
}

export interface Content {
    id: number;
    type: string;
    title: string;
    hidden: boolean;
    description: string;
    thumbnail: string;
    parentId: number;
    perent: Content;
    VideoProgress: VideoProgress[];
    children: Content[];
    courses: CourseContent[];
    createdAtL: string;
    VideoMetaData: VideoMetaData;
    NotionMetadata: NotionMetadata;
    notionMetadataId: number;
    comments: Comment[];
    commentsCount: number;
    bookmark: Bookmark[];
}

interface NotionMetadata {
    id: number;
    contentId: number;
    content: Content;
    notionId: string;
}

interface VideoMetaData {
    id: number;
    contentId: number;

    // 1080p MP4 variants
    video_1080p_mp4_1?: string;
    video_1080p_mp4_2?: string;
    video_1080p_mp4_3?: string;
    video_1080p_mp4_4?: string;

    // 1080p variants
    video_1080p_1?: string;
    video_1080p_2?: string;
    video_1080p_3?: string;
    video_1080p_4?: string;

    // 720p MP4 variants
    video_720p_mp4_1?: string;
    video_720p_mp4_2?: string;
    video_720p_mp4_3?: string;
    video_720p_mp4_4?: string;

    // 720p variants
    video_720p_1?: string;
    video_720p_2?: string;
    video_720p_3?: string;
    video_720p_4?: string;

    // 360p MP4 variants
    video_360p_mp4_1?: string;
    video_360p_mp4_2?: string;
    video_360p_mp4_3?: string;
    video_360p_mp4_4?: string;

    // 360p variants
    video_360p_1?: string;
    video_360p_2?: string;
    video_360p_3?: string;
    video_360p_4?: string;

    // Other metadata
    subtitles?: string;
    subtitle_tried: number;
    segments?: any;
    content: Content;
    slides?: string;
    thumbnail_mosiac_url?: string;
    duration?: number;

    // Migration related fields
    migration_status: MigrationStatus;
    migration_pickup_time?: Date;
    migrated_video_1080p_mp4_1?: string;
    migrated_video_360p_mp4_1?: string;
    migrated_video_720p_mp4_1?: string;
    original_mp4_url?: string;
    transcoded: boolean;
}

export interface Bookmark {
    id: string;
    userId: string;
    contentId: number;
    user: Content;
    createdAt: string;
}

export interface CourseContent {
    course: Course;
    courseId: number;
    content: Content;
    contentId: number;
}

export interface UserPurchases {
    user: User;
    userId: number;
    course: Course;
    courseId: number;
    assignedAt: string;
}

export interface Certificate {
    id: string;
    user: User;
    slug: string;
    userId: string;
    course: Course;
    courseId: number;
}

export interface VideoProgress {
    id: number;
    userId: String;
    contentId: number;
    currentTimestamp: number;
    user: User;
    content: Content;
    markAsCompleted: boolean;
    updatedAt: string;
}
