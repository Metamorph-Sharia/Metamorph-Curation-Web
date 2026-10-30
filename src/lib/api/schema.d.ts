// Generated from the curation API's OpenAPI contract by `npm run api:types`. Do not edit.
export interface paths {
    "/api/v1/auth/session": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Session */
        get: operations["session_api_v1_auth_session_get"];
        put?: never;
        /** Sign In */
        post: operations["sign_in_api_v1_auth_session_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search
         * @description Documents whose metadata or published wording matches `q` (all of them when it is empty), or, with
         *     kind=articles, the matching articles; filtered, with each filter's counts.
         */
        get: operations["search_api_v1_documents_get"];
        put?: never;
        /** Add Document */
        post: operations["add_document_api_v1_documents_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Document */
        get: operations["document_api_v1_documents__document_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/citations/{citation_id}/link": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Link Citation */
        post: operations["link_citation_api_v1_documents__document_id__citations__citation_id__link_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/conflicts/{conflict_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resolve Conflict */
        post: operations["resolve_conflict_api_v1_documents__document_id__conflicts__conflict_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/content/{sha256}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Content */
        get: operations["content_api_v1_documents__document_id__content__sha256__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/corrections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Correct */
        post: operations["correct_api_v1_documents__document_id__corrections_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/corrections/{field}/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Correction */
        post: operations["withdraw_correction_api_v1_documents__document_id__corrections__field__withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/id": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Assign Id
         * @description Answers the document under its new ID.
         */
        post: operations["assign_id_api_v1_documents__document_id__id_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/reading": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Reading
         * @description A text as the parser cut it, one part at a time: `text` (the main text when empty), and the part asked
         *     for or the one the provision `at` opens in.
         */
        get: operations["reading_api_v1_documents__document_id__reading_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/restore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Restore */
        post: operations["restore_api_v1_documents__document_id__restore_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/suppression": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Suppress */
        post: operations["suppress_api_v1_documents__document_id__suppression_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/approval": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Approve */
        post: operations["approve_api_v1_documents__document_id__texts__text_sha256__approval_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/approval/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Approval */
        post: operations["withdraw_approval_api_v1_documents__document_id__texts__text_sha256__approval_withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/correction": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Correction */
        get: operations["correction_api_v1_documents__document_id__texts__text_sha256__correction_get"];
        put?: never;
        /** Correct Text */
        post: operations["correct_text_api_v1_documents__document_id__texts__text_sha256__correction_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/correction/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Text Correction */
        post: operations["withdraw_text_correction_api_v1_documents__document_id__texts__text_sha256__correction_withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/documents/{document_id}/texts/{text_sha256}/editable": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Editable */
        get: operations["editable_api_v1_documents__document_id__texts__text_sha256__editable_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/gaps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Gaps */
        get: operations["gaps_api_v1_gaps_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/held": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Held */
        get: operations["held_api_v1_held_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/companies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Companies */
        get: operations["companies_api_v1_market_companies_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/companies/{company_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Company */
        get: operations["company_api_v1_market_companies__company_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/datasets": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Datasets */
        get: operations["datasets_api_v1_market_datasets_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/datasets/{dataset_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Dataset
         * @description A dataset with a page of its series.
         */
        get: operations["dataset_api_v1_market_datasets__dataset_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Market Overview */
        get: operations["market_overview_api_v1_market_overview_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/registers/{register_id}/links": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set Register Links
         * @description Replace a register's curated links; published at once.
         */
        put: operations["set_register_links_api_v1_market_registers__register_id__links_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/releases": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Releases
         * @description Press releases, newest first; `from` and `to` bound their published date.
         */
        get: operations["releases_api_v1_market_releases_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/releases/{release_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Release */
        get: operations["release_api_v1_market_releases__release_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/reports": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Reports */
        get: operations["reports_api_v1_market_reports_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/reports/{report_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Report
         * @description A report with a page of its passages, each with what it names.
         */
        get: operations["report_api_v1_market_reports__report_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/sectors/{sector_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set Sector
         * @description Add a sector, or replace its names and industries; published at once.
         */
        put: operations["set_sector_api_v1_market_sectors__sector_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/sectors/{sector_id}/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Sector */
        post: operations["withdraw_sector_api_v1_market_sectors__sector_id__withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/series/{series_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Market Series
         * @description A series with every observation, oldest first.
         */
        get: operations["market_series_api_v1_market_series__series_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/sources": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Market Sources
         * @description Registers and statistics sources with their curated links, the industries and the sectors.
         */
        get: operations["market_sources_api_v1_market_sources_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/sources/{source_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Set Source */
        put: operations["set_source_api_v1_market_sources__source_id__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/sources/{source_id}/industries/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Set Industry
         * @description Add an industry as its source names it, or replace its links; published at once.
         */
        put: operations["set_industry_api_v1_market_sources__source_id__industries__name__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/market/sources/{source_id}/industries/{name}/withdraw": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Withdraw Industry */
        post: operations["withdraw_industry_api_v1_market_sources__source_id__industries__name__withdraw_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Overview */
        get: operations["overview_api_v1_overview_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/reviews": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Reviews */
        get: operations["reviews_api_v1_reviews_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/reviews/{item_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Decide Review */
        post: operations["decide_review_api_v1_reviews__item_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/series": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Series
         * @description Each issuer's families of instruments, with what the registry holds of them.
         */
        get: operations["series_api_v1_series_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/series/{issuer}/{family}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Series Page
         * @description A family's documents of one year (the newest when none is asked for), by number.
         */
        get: operations["series_page_api_v1_series__issuer___family__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/uploads": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Upload */
        post: operations["upload_api_v1_uploads_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * ArticleHit
         * @description A published article whose wording matches: the unit lawyers cite, not each of its paragraphs.
         */
        ArticleHit: {
            /** Address */
            address: string;
            /** Citation */
            citation: string;
            /** Document Id */
            document_id: string;
            /** Excerpt */
            excerpt: string;
            /** Heading */
            heading: string | null;
            /** Label */
            label: string;
            /** Status */
            status: string;
            /** Title */
            title: string;
        };
        /** BundleRow */
        BundleRow: {
            /** Connector */
            connector: string;
            /** Loaded */
            loaded: number;
            /** Quarantined */
            quarantined: number;
            /**
             * Received At
             * Format: date-time
             */
            received_at: string;
            /** Run Id */
            run_id: string;
            /** State */
            state: string;
            /** Unchanged */
            unchanged: number;
        };
        /**
         * Check
         * @enum {string}
         */
        Check: "identity" | "text" | "parsed" | "structure";
        /** CheckRow */
        CheckRow: {
            /** Detail */
            detail: string;
            /** Name */
            name: string;
            /** Severity */
            severity: string;
        };
        /** CitationRow */
        CitationRow: {
            /** From Address */
            from_address: string | null;
            /** Id */
            id: number;
            /** Relation */
            relation: string;
            /** Target Id */
            target_id: string | null;
            /** Target Text */
            target_text: string;
        };
        /** CitationTarget */
        CitationTarget: {
            /**
             * Reason
             * @default
             */
            reason: string;
            /** Target Id */
            target_id: string;
        };
        /** CompanyPage */
        CompanyPage: {
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["CompanyRow"][];
            /** Total */
            total: number;
        };
        /** CompanyRow */
        CompanyRow: {
            /** Business Type */
            business_type: string | null;
            /** First Listed */
            first_listed: string | null;
            /** Id */
            id: string;
            /** Left After */
            left_after: string | null;
            /** Legal Name */
            legal_name: string;
            /** Register */
            register: string;
            /** Status */
            status: string;
        };
        /** CompanyView */
        CompanyView: {
            company: components["schemas"]["CompanyRow"];
            /** Entities */
            entities: components["schemas"]["EntityRow"][];
            /** Mentions */
            mentions: components["schemas"]["MentionRow"][];
            /** Names */
            names: string[];
        };
        /** ConflictDecision */
        ConflictDecision: {
            /** Decision */
            decision: string;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** ConflictRow */
        ConflictRow: {
            /** Correction */
            correction: unknown;
            /**
             * Detected At
             * Format: date-time
             */
            detected_at: string;
            /** Field */
            field: string;
            /** Id */
            id: number;
            /** Source Value */
            source_value: unknown;
        };
        /** ContentRow */
        ContentRow: {
            approval?: components["schemas"]["CuratorNote"] | null;
            correction?: components["schemas"]["CuratorNote"] | null;
            /** Detail */
            detail: string;
            /**
             * Editable
             * @default false
             */
            editable: boolean;
            /** Label */
            label: string;
            /** Media Type */
            media_type: string;
            /**
             * Problems
             * @default []
             */
            problems: string[];
            /** Sha256 */
            sha256: string;
        };
        /** CorrectionDiff */
        CorrectionDiff: {
            /** Corrected */
            corrected: string;
            correction: components["schemas"]["CorrectionView"];
            /** Diff */
            diff: string[];
            /** Source */
            source: string;
        };
        /** CorrectionRow */
        CorrectionRow: {
            /** Author */
            author: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Reason */
            reason: string;
            /** Source Value */
            source_value: unknown;
            /** Value */
            value: unknown;
        };
        /**
         * CorrectionView
         * @description A curator's correction of a text (the latest one), to compare with the source's wording.
         */
        CorrectionView: {
            /** Active */
            active: boolean;
            /** Citation */
            citation: string;
            /** Corrected Storage Key */
            corrected_storage_key: string;
            /** Current */
            current: boolean;
            /** Document Id */
            document_id: string;
            note: components["schemas"]["CuratorNote"];
            /** Sha256 */
            sha256: string;
            /** Source Storage Key */
            source_storage_key: string;
        };
        /** Curator */
        Curator: {
            /** Display Name */
            display_name: string;
            /** Username */
            username: string;
        };
        /** CuratorNote */
        CuratorNote: {
            /** Author */
            author: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Reason */
            reason: string;
        };
        /** Dashboard */
        Dashboard: {
            /** Checks */
            checks: components["schemas"]["CheckRow"][];
            /** Documents By Issuer */
            documents_by_issuer: [
                string,
                number
            ][];
            /**
             * Gaps
             * @default 0
             */
            gaps: number;
            /** Health Status */
            health_status: string | null;
            /** Health Taken At */
            health_taken_at: string | null;
            /**
             * Held
             * @default 0
             */
            held: number;
            /**
             * Held Published
             * @default 0
             */
            held_published: number;
            /** Open Reviews */
            open_reviews: [
                string,
                number
            ][];
            /** Published */
            published: number;
            /** Recent Bundles */
            recent_bundles: components["schemas"]["BundleRow"][];
        };
        /** DatasetPage */
        DatasetPage: {
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["DatasetRow"][];
            /** Total */
            total: number;
        };
        /** DatasetRow */
        DatasetRow: {
            /**
             * First Period
             * Format: date
             */
            first_period: string;
            /** Group */
            group: string;
            /** Id */
            id: string;
            /** Industry */
            industry: string | null;
            /**
             * Last Period
             * Format: date
             */
            last_period: string;
            /** Metric */
            metric: string;
            /** Register */
            register: string | null;
            /** Series */
            series: number;
            /** Source */
            source: string;
            /** Updated */
            updated: string | null;
        };
        /** DatasetView */
        DatasetView: {
            /** Citation */
            citation: string | null;
            dataset: components["schemas"]["DatasetRow"];
            /** Governed By */
            governed_by: string[];
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Reports */
            reports: string[];
            /** Series */
            series: components["schemas"]["MarketSeriesRow"][];
            /** Series Total */
            series_total: number;
            /** Url */
            url: string | null;
        };
        /** DocumentHit */
        DocumentHit: {
            /** Citation */
            citation: string;
            /** Family */
            family: string;
            /** Id */
            id: string;
            /** Issuer */
            issuer: string;
            /** Kind */
            kind: string;
            /** Number */
            number: string;
            /** State */
            state: string;
            /** Status */
            status: string;
            /** Title */
            title: string;
            /** Year */
            year: number | null;
        };
        /** DocumentRow */
        DocumentRow: {
            /** Citation */
            citation: string;
            /** Id */
            id: string;
            /** Issuer */
            issuer: string;
            /** Kind */
            kind: string;
            /** Status */
            status: string;
            /** Suppressed */
            suppressed: boolean;
            /** Title */
            title: string;
        };
        /** DocumentView */
        DocumentView: {
            /** Conflicts */
            conflicts: components["schemas"]["ConflictRow"][];
            /** Fields */
            fields: components["schemas"]["FieldRow"][];
            /** Files */
            files: components["schemas"]["ContentRow"][];
            /**
             * Hold
             * @default []
             */
            hold: components["schemas"]["HoldReason"][];
            /** Id Confidence */
            id_confidence: string;
            /**
             * Lapsed Corrections
             * @default []
             */
            lapsed_corrections: string[];
            /** Links In */
            links_in: components["schemas"]["LinkRow"][];
            /** Links Out */
            links_out: components["schemas"]["LinkRow"][];
            /** Open Citations */
            open_citations: components["schemas"]["CitationRow"][];
            /** Open Reviews */
            open_reviews: components["schemas"]["ReviewRow"][];
            /** Provisions */
            provisions: components["schemas"]["ProvisionRow"][];
            /** Provisions Total */
            provisions_total: number;
            /** Published At */
            published_at?: string | null;
            /** Sources */
            sources: components["schemas"]["SourceRow"][];
            /** Status History */
            status_history: components["schemas"]["StatusRow"][];
            summary: components["schemas"]["DocumentRow"];
            suppression: components["schemas"]["SuppressionRow"] | null;
            /** Texts */
            texts: components["schemas"]["ContentRow"][];
        };
        /** Done */
        Done: {
            /** Done */
            done: string;
        };
        /**
         * EditableText
         * @description A current main text, to correct: its effective wording is at `storage_key`.
         */
        EditableText: {
            /** Citation */
            citation: string;
            /** Corrected */
            corrected: boolean;
            /** Document Id */
            document_id: string;
            /** Paged */
            paged: boolean;
            /** Sha256 */
            sha256: string;
            /** Storage Key */
            storage_key: string;
        };
        /** EntityRow */
        EntityRow: {
            /** Business Type */
            business_type: string | null;
            /** First Listed */
            first_listed: string | null;
            /** Id */
            id: string;
            /** Kind */
            kind: string;
            /** Last Listed */
            last_listed: string | null;
            /** Left After */
            left_after: string | null;
            /** Legal Name */
            legal_name: string;
            /** License Date */
            license_date: string | null;
            /** License Number */
            license_number: string;
            /** On Newest List */
            on_newest_list: boolean;
            /** Review Notes */
            review_notes: string[];
            /** Website */
            website: string | null;
        };
        /** Facet */
        Facet: {
            /** Name */
            name: string;
            /** Values */
            values: [
                string,
                number
            ][];
        };
        /** FieldCorrection */
        FieldCorrection: {
            /** Field */
            field: string;
            /**
             * Reason
             * @default
             */
            reason: string;
            /**
             * Value
             * @default
             */
            value: string;
        };
        /**
         * FieldRow
         * @description One overridable field: what the knowledge layer sees, the registry's value, and each source's.
         */
        FieldRow: {
            /** By Source */
            by_source: [
                string,
                unknown
            ][];
            correction: components["schemas"]["CorrectionRow"] | null;
            /** Effective */
            effective: unknown;
            /** Field */
            field: string;
            /** Registry */
            registry: unknown;
        };
        /** GapPage */
        GapPage: {
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["GapRow"][];
            /** Total */
            total: number;
        };
        /**
         * GapRow
         * @description A published document whose main text has gaps in its numbering, left to review (domain/publishing.py).
         */
        GapRow: {
            /** Document Id */
            document_id: string;
            /** Notes */
            notes: components["schemas"]["ReviewNote"][];
            /** Title */
            title: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** HeldPage */
        HeldPage: {
            /** Check */
            check: string | null;
            /** Counts */
            counts: [
                string,
                number
            ][];
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["HeldRow"][];
            /** Total */
            total: number;
        };
        /** HeldRow */
        HeldRow: {
            /** Document Id */
            document_id: string;
            /**
             * Held Since
             * Format: date-time
             */
            held_since: string;
            /** Published At */
            published_at: string | null;
            /** Reasons */
            reasons: components["schemas"]["HoldReason"][];
            /** Title */
            title: string;
        };
        /** HoldReason */
        HoldReason: {
            check: components["schemas"]["Check"];
            /** Detail */
            detail: string;
        };
        /** IndustryChange */
        IndustryChange: {
            /**
             * Governed By
             * @default []
             */
            governed_by: string[];
            /**
             * Reason
             * @default
             */
            reason: string;
            /** Register */
            register?: string | null;
            /**
             * Reports
             * @default []
             */
            reports: string[];
        };
        /** IndustryName */
        IndustryName: {
            /** Name */
            name: string;
            /** Source */
            source: string;
        };
        /** IndustryView */
        IndustryView: {
            /** Datasets */
            datasets: number;
            /** Governed By */
            governed_by: string[];
            /** Name */
            name: string;
            /** Register */
            register: string | null;
            /** Reports */
            reports: string[];
            /** Source */
            source: string;
        };
        /** Link */
        Link: {
            /** Url */
            url: string;
        };
        /** LinkRow */
        LinkRow: {
            /** Document Citation */
            document_citation?: string | null;
            /** Document Id */
            document_id: string;
            /** Document Title */
            document_title: string | null;
            /** Effective On */
            effective_on?: string | null;
            /** From Address */
            from_address: string | null;
            /** Method */
            method: string;
            /** To Address */
            to_address: string | null;
            /** Type */
            type: string;
        };
        /**
         * MarketChange
         * @description A change to the curated links, as published: what it named that is not published, and the sources page.
         */
        MarketChange: {
            sources: components["schemas"]["MarketSources"];
            /** Warnings */
            warnings: string[];
        };
        /** MarketCounts */
        MarketCounts: {
            /** Companies */
            companies: number;
            /** Datasets */
            datasets: number;
            /** Entities */
            entities: number;
            /** Mentions */
            mentions: number;
            /** Observations */
            observations: number;
            /** Releases */
            releases: number;
            /** Reports */
            reports: number;
            /** Sectors */
            sectors: number;
            /** Series */
            series: number;
        };
        /** MarketOverview */
        MarketOverview: {
            /** Checks */
            checks: components["schemas"]["CheckRow"][];
            counts: components["schemas"]["MarketCounts"];
            /** Health Taken At */
            health_taken_at: string | null;
            /** Open Reviews */
            open_reviews: number;
            /** Recent Bundles */
            recent_bundles: components["schemas"]["BundleRow"][];
        };
        /** MarketSeriesRow */
        MarketSeriesRow: {
            /**
             * First Period
             * Format: date
             */
            first_period: string;
            /** Frequency */
            frequency: string;
            /** Id */
            id: string;
            /** Label */
            label: string;
            /**
             * Last Period
             * Format: date
             */
            last_period: string;
            /** Observations */
            observations: number;
            /** Unit */
            unit: string | null;
        };
        /**
         * MarketSources
         * @description Everything a curator keeps on the market's sources page: the curated links, and what they reach.
         */
        MarketSources: {
            /** Industries */
            industries: components["schemas"]["IndustryView"][];
            /** Named Industries */
            named_industries: components["schemas"]["IndustryName"][];
            /** Registers */
            registers: components["schemas"]["RegisterView"][];
            /** Sectors */
            sectors: components["schemas"]["SectorView"][];
            /** Sources */
            sources: components["schemas"]["StatisticsSourceView"][];
        };
        /**
         * MentionRow
         * @description A report or release passage that names a regulation or a company.
         */
        MentionRow: {
            /** Address */
            address: string;
            /** Citation */
            citation: string;
            /** Document */
            document: string;
            /** Kind */
            kind: string;
            /** Published On */
            published_on: string | null;
            /** Title */
            title: string;
        };
        /** NamedTarget */
        NamedTarget: {
            /** Id */
            id: string;
            /** Kind */
            kind: string;
        };
        /**
         * NewDocument
         * @description A document no connector holds (domain/manual.py), its file uploaded first (POST /uploads).
         */
        NewDocument: {
            /** Citation */
            citation: string;
            /** Document Id */
            document_id: string;
            /**
             * Effective On
             * @default
             */
            effective_on: string;
            /**
             * Enacted On
             * @default
             */
            enacted_on: string;
            /** File Name */
            file_name: string;
            /** Kind */
            kind: string;
            /**
             * Language
             * @default id
             */
            language: string;
            /**
             * Media Type
             * @default application/octet-stream
             */
            media_type: string;
            /**
             * Promulgated On
             * @default
             */
            promulgated_on: string;
            /**
             * Reason
             * @default
             */
            reason: string;
            /**
             * Rights
             * @default public
             */
            rights: string;
            /** Source Url */
            source_url: string;
            /** Status */
            status: string;
            /**
             * Text
             * @default
             */
            text: string;
            /** Title */
            title: string;
            /** Upload Key */
            upload_key: string;
        };
        /** NewId */
        NewId: {
            /** New Id */
            new_id: string;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** ObservationRow */
        ObservationRow: {
            /**
             * Period
             * Format: date
             */
            period: string;
            /** Provisional */
            provisional: boolean;
            /** Value */
            value: number;
        };
        /** PageStart */
        PageStart: {
            /** At */
            at: number;
            /** Page */
            page: number;
        };
        /**
         * PassageReference
         * @description A reference in a block to another provision of the same text ("Pasal 19 ayat (2)").
         */
        PassageReference: {
            /** Address */
            address: string;
            /** End */
            end: number;
            /** Start */
            start: number;
        };
        /** PassageRow */
        PassageRow: {
            /** Address */
            address: string;
            /** Names */
            names: components["schemas"]["NamedTarget"][];
            /** Ordinal */
            ordinal: number;
            /** Page End */
            page_end: number | null;
            /** Page Start */
            page_start: number | null;
            /** Text */
            text: string;
            /** Words */
            words: number;
        };
        /**
         * ProvisionChange
         * @description Another document's change to a provision: an amendment or a revocation, and where the new wording is.
         */
        ProvisionChange: {
            /** Citation */
            citation: string | null;
            /** Document Id */
            document_id: string;
            /** Effective On */
            effective_on: string | null;
            /** New Address */
            new_address: string | null;
            /** Type */
            type: string;
        };
        /** ProvisionRow */
        ProvisionRow: {
            /** Address */
            address: string;
            /** Depth */
            depth: number;
            /** Heading */
            heading: string | null;
            /** Kind */
            kind: string;
            /** Label */
            label: string;
            /** Page Start */
            page_start: number | null;
            /** Valid To */
            valid_to: string | null;
        };
        /** ReadableText */
        ReadableText: {
            /** Detail */
            detail: string;
            /** Language */
            language: string;
            /** Main */
            main: boolean;
            /** Sha256 */
            sha256: string;
        };
        /**
         * ReadingBlock
         * @description A paragraph or a list item of a passage, its printed lines joined (domain/layout.py).
         */
        ReadingBlock: {
            /**
             * Depth
             * @default 0
             */
            depth: number;
            /** Marker */
            marker?: string | null;
            /**
             * Pages
             * @default []
             */
            pages: components["schemas"]["PageStart"][];
            /**
             * References
             * @default []
             */
            references: components["schemas"]["PassageReference"][];
            /** Text */
            text: string;
        };
        /** ReadingPassage */
        ReadingPassage: {
            /** Address */
            address: string | null;
            /**
             * Blocks
             * @default []
             */
            blocks: components["schemas"]["ReadingBlock"][];
            /** Opens */
            opens: boolean;
            /** Titled */
            titled: boolean;
        };
        /** ReadingProvision */
        ReadingProvision: {
            /** Address */
            address: string;
            /** Changes */
            changes: components["schemas"]["ProvisionChange"][];
            /** Depth */
            depth: number;
            /** Edit From */
            edit_from: number;
            /** Edit To */
            edit_to: number;
            /** Heading */
            heading: string | null;
            /** Kind */
            kind: string;
            /** Label */
            label: string;
            /** Page End */
            page_end: number | null;
            /** Page Start */
            page_start: number | null;
            /** Parent Address */
            parent_address: string | null;
            /** Part */
            part: number;
            /** Valid To */
            valid_to: string | null;
        };
        /** Reason */
        Reason: {
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** RegisterLinksChange */
        RegisterLinksChange: {
            /** Fresh Days */
            fresh_days: number;
            /**
             * Governed By
             * @default []
             */
            governed_by: string[];
            /**
             * Reason
             * @default
             */
            reason: string;
            /**
             * Reports
             * @default []
             */
            reports: string[];
        };
        /** RegisterView */
        RegisterView: {
            /** Companies */
            companies: number;
            /** Editions */
            editions: number;
            /** Fresh Days */
            fresh_days: number;
            /** Governed By */
            governed_by: string[];
            /** Id */
            id: string;
            /** Issuer */
            issuer: string;
            /** Name */
            name: string;
            /** Newest Edition */
            newest_edition: string | null;
            /** Reports */
            reports: string[];
        };
        /** ReleasePage */
        ReleasePage: {
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["ReleaseRow"][];
            /** Total */
            total: number;
        };
        /** ReleaseRow */
        ReleaseRow: {
            /** Id */
            id: string;
            /** Number */
            number: string | null;
            /** Passages */
            passages: number;
            /**
             * Published On
             * Format: date
             */
            published_on: string;
            /** Title */
            title: string;
        };
        /** ReleaseView */
        ReleaseView: {
            /** Citation */
            citation: string;
            /** Passages */
            passages: components["schemas"]["PassageRow"][];
            release: components["schemas"]["ReleaseRow"];
            /** Url */
            url: string | null;
        };
        /** ReportRow */
        ReportRow: {
            /** Edition */
            edition: string;
            /** Family */
            family: string;
            /** Id */
            id: string;
            /** Issuer */
            issuer: string;
            /** Method */
            method: string;
            /** Pages */
            pages: number;
            /** Passages */
            passages: number;
            /** Published On */
            published_on: string | null;
            /** Title */
            title: string;
        };
        /** ReportView */
        ReportView: {
            /** Citation */
            citation: string;
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Passages */
            passages: components["schemas"]["PassageRow"][];
            report: components["schemas"]["ReportRow"];
            /** Url */
            url: string | null;
        };
        /** ReviewDecision */
        ReviewDecision: {
            /**
             * Reason
             * @default
             */
            reason: string;
            /** State */
            state: string;
        };
        /**
         * ReviewNote
         * @description A structure warning published with the document, for review: on the provision it names, or on the document
         *     when it names none. The document is published all the same (domain/gate.py).
         */
        ReviewNote: {
            /** Address */
            address: string | null;
            /** Note */
            note: string;
        };
        /** ReviewPage */
        ReviewPage: {
            /** Kind */
            kind: string;
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Rows */
            rows: components["schemas"]["ReviewRow"][];
            /** Total */
            total: number;
        };
        /** ReviewRow */
        ReviewRow: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Document Id */
            document_id: string | null;
            /** Document Title */
            document_title: string | null;
            /** Id */
            id: number;
            /** Kind */
            kind: string;
            /** Subject */
            subject: {
                [key: string]: unknown;
            };
            /** Summary */
            summary: string;
        };
        /** SearchFilters */
        SearchFilters: {
            /** Family */
            family?: string | null;
            /** Issuer */
            issuer?: string | null;
            /** State */
            state?: string | null;
            /** Status */
            status?: string | null;
            /** Year */
            year?: number | null;
        };
        /** SearchPage */
        SearchPage: {
            /** Articles */
            articles: components["schemas"]["ArticleHit"][];
            /** Articles Total */
            articles_total: number;
            /** Documents */
            documents: components["schemas"]["DocumentHit"][];
            /** Documents Total */
            documents_total: number;
            /** Facets */
            facets: components["schemas"]["Facet"][];
            filters: components["schemas"]["SearchFilters"];
            /** Kind */
            kind: string;
            /** Page */
            page: number;
            /** Pages */
            pages: number;
            /** Query */
            query: string;
        };
        /** SectorChange */
        SectorChange: {
            /** Industries */
            industries: components["schemas"]["IndustryName"][];
            /** Name */
            name: string;
            /**
             * Name En
             * @default
             */
            name_en: string;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** SectorView */
        SectorView: {
            /** Datasets */
            datasets: number;
            /** Governed By */
            governed_by: string[];
            /** Id */
            id: string;
            /** Industries */
            industries: components["schemas"]["IndustryName"][];
            /** Name */
            name: string;
            /** Name En */
            name_en: string;
            /** Registers */
            registers: string[];
            /** Reports */
            reports: string[];
        };
        /** SeriesPage */
        SeriesPage: {
            /** Documents */
            documents: components["schemas"]["DocumentHit"][];
            /** Family */
            family: string;
            /** Issuer */
            issuer: string;
            /** Year */
            year: number | null;
            /** Years */
            years: [
                number,
                number
            ][];
        };
        /**
         * SeriesRow
         * @description An issuer's family of instruments (OJK's POJK, BI's PADG …): what the registry holds of it.
         */
        SeriesRow: {
            /** Documents */
            documents: number;
            /** Family */
            family: string;
            /** First Year */
            first_year: number | null;
            /** Issuer */
            issuer: string;
            /** Last Year */
            last_year: number | null;
        };
        /** SeriesView */
        SeriesView: {
            /** Citation */
            citation: string | null;
            /** Dataset */
            dataset: string;
            /** Dimensions */
            dimensions: {
                [key: string]: string;
            }[];
            /** Measure */
            measure: string;
            /** Observations */
            observations: components["schemas"]["ObservationRow"][];
            series: components["schemas"]["MarketSeriesRow"];
            /** Url */
            url: string | null;
        };
        /** Session */
        Session: {
            curator: components["schemas"]["Curator"];
            /**
             * Expires At
             * Format: date-time
             */
            expires_at: string;
            /** Token */
            token: string;
        };
        /** SignIn */
        SignIn: {
            /** Password */
            password: string;
            /** Username */
            username: string;
        };
        /** SourceChange */
        SourceChange: {
            /**
             * Citation
             * @default
             */
            citation: string;
            /**
             * Download Hint
             * @default
             */
            download_hint: string;
            /**
             * Download Page
             * @default
             */
            download_page: string;
            /** Fresh Days */
            fresh_days: number;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** SourceRow */
        SourceRow: {
            /** Connector */
            connector: string;
            /**
             * Fetched At
             * Format: date-time
             */
            fetched_at: string;
            /** Missing Since */
            missing_since: string | null;
            /** Source Id */
            source_id: string;
            /** Url */
            url: string;
        };
        /** StatisticsSourceView */
        StatisticsSourceView: {
            /** Citation */
            citation: string | null;
            /** Datasets */
            datasets: number;
            /** Download Hint */
            download_hint: string | null;
            /** Download Page */
            download_page: string | null;
            /** Fresh Days */
            fresh_days: number;
            /** Id */
            id: string;
            /** Issuer */
            issuer: string;
            /** Name */
            name: string;
            /** Newest Period */
            newest_period: string | null;
            /** Series */
            series: number;
        };
        /** StatusRow */
        StatusRow: {
            /** Address */
            address: string | null;
            /** Caused By */
            caused_by?: string | null;
            /** Caused By Citation */
            caused_by_citation?: string | null;
            /** Effective From */
            effective_from: string | null;
            /** Source */
            source: string;
            /** Status */
            status: string;
        };
        /** Suppression */
        Suppression: {
            /**
             * Confirm
             * @default false
             */
            confirm: boolean;
            /**
             * Reason
             * @default
             */
            reason: string;
        };
        /** SuppressionRow */
        SuppressionRow: {
            /** Author */
            author: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Reason */
            reason: string;
        };
        /**
         * TextReading
         * @description One part of a text, read as the parser cut it, with the whole text's outline.
         */
        TextReading: {
            /** Citation */
            citation: string;
            /** Corrected */
            corrected: boolean;
            /** Document Id */
            document_id: string;
            /** Editable */
            editable: boolean;
            /** Part */
            part: number;
            /** Parts */
            parts: number;
            /** Passages */
            passages: components["schemas"]["ReadingPassage"][];
            /** Pdf Sha256 */
            pdf_sha256: string | null;
            /** Problems */
            problems: string[];
            /** Provisions */
            provisions: components["schemas"]["ReadingProvision"][];
            /** Sha256 */
            sha256: string;
            /** Texts */
            texts: components["schemas"]["ReadableText"][];
            /** Title */
            title: string;
        };
        /** TextToEdit */
        TextToEdit: {
            text: components["schemas"]["EditableText"];
            /** Wording */
            wording: string;
        };
        /** Upload */
        Upload: {
            /** File Name */
            file_name: string;
            /**
             * Media Type
             * @default application/octet-stream
             */
            media_type: string;
        };
        /** UploadLink */
        UploadLink: {
            /** Upload Key */
            upload_key: string;
            /** Url */
            url: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Context */
            ctx?: Record<string, never>;
            /** Input */
            input?: unknown;
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** Wording */
        Wording: {
            /**
             * Reason
             * @default
             */
            reason: string;
            /** Wording */
            wording: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    session_api_v1_auth_session_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Curator"];
                };
            };
        };
    };
    sign_in_api_v1_auth_session_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SignIn"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Session"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    search_api_v1_documents_get: {
        parameters: {
            query?: {
                q?: string;
                kind?: string;
                issuer?: string;
                family?: string;
                year?: number | null;
                status?: string;
                state?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SearchPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    add_document_api_v1_documents_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewDocument"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    document_api_v1_documents__document_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    link_citation_api_v1_documents__document_id__citations__citation_id__link_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                citation_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CitationTarget"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    resolve_conflict_api_v1_documents__document_id__conflicts__conflict_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                conflict_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConflictDecision"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    content_api_v1_documents__document_id__content__sha256__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Link"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    correct_api_v1_documents__document_id__corrections_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FieldCorrection"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_correction_api_v1_documents__document_id__corrections__field__withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                field: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    assign_id_api_v1_documents__document_id__id_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewId"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    reading_api_v1_documents__document_id__reading_get: {
        parameters: {
            query?: {
                text?: string;
                part?: number;
                at?: string;
            };
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TextReading"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    restore_api_v1_documents__document_id__restore_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    suppress_api_v1_documents__document_id__suppression_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Suppression"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    approve_api_v1_documents__document_id__texts__text_sha256__approval_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_approval_api_v1_documents__document_id__texts__text_sha256__approval_withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    correction_api_v1_documents__document_id__texts__text_sha256__correction_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CorrectionDiff"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    correct_text_api_v1_documents__document_id__texts__text_sha256__correction_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Wording"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_text_correction_api_v1_documents__document_id__texts__text_sha256__correction_withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DocumentView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    editable_api_v1_documents__document_id__texts__text_sha256__editable_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                document_id: string;
                text_sha256: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TextToEdit"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    gaps_api_v1_gaps_get: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GapPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    held_api_v1_held_get: {
        parameters: {
            query?: {
                check?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HeldPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    companies_api_v1_market_companies_get: {
        parameters: {
            query?: {
                q?: string;
                register?: string;
                status?: string;
                business_type?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CompanyPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    company_api_v1_market_companies__company_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                company_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CompanyView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    datasets_api_v1_market_datasets_get: {
        parameters: {
            query?: {
                q?: string;
                source?: string;
                industry?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DatasetPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    dataset_api_v1_market_datasets__dataset_id__get: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: never;
            path: {
                dataset_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DatasetView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    market_overview_api_v1_market_overview_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketOverview"];
                };
            };
        };
    };
    set_register_links_api_v1_market_registers__register_id__links_put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                register_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["RegisterLinksChange"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketChange"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    releases_api_v1_market_releases_get: {
        parameters: {
            query?: {
                q?: string;
                from?: string | null;
                to?: string | null;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReleasePage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    release_api_v1_market_releases__release_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                release_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReleaseView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    reports_api_v1_market_reports_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReportRow"][];
                };
            };
        };
    };
    report_api_v1_market_reports__report_id__get: {
        parameters: {
            query?: {
                page?: number;
            };
            header?: never;
            path: {
                report_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReportView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    set_sector_api_v1_market_sectors__sector_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sector_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SectorChange"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketChange"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_sector_api_v1_market_sectors__sector_id__withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                sector_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketChange"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    market_series_api_v1_market_series__series_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                series_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SeriesView"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    market_sources_api_v1_market_sources_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketSources"];
                };
            };
        };
    };
    set_source_api_v1_market_sources__source_id__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                source_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SourceChange"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketChange"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    set_industry_api_v1_market_sources__source_id__industries__name__put: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                source_id: string;
                name: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["IndustryChange"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketChange"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    withdraw_industry_api_v1_market_sources__source_id__industries__name__withdraw_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                source_id: string;
                name: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Reason"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MarketChange"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    overview_api_v1_overview_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Dashboard"];
                };
            };
        };
    };
    reviews_api_v1_reviews_get: {
        parameters: {
            query?: {
                kind?: string;
                page?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ReviewPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    decide_review_api_v1_reviews__item_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                item_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReviewDecision"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Done"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    series_api_v1_series_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SeriesRow"][];
                };
            };
        };
    };
    series_page_api_v1_series__issuer___family__get: {
        parameters: {
            query?: {
                year?: number | null;
            };
            header?: never;
            path: {
                issuer: string;
                family: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SeriesPage"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    upload_api_v1_uploads_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Upload"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UploadLink"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
