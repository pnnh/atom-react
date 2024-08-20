import {css} from '@emotion/css'
import {FullPagination} from "@pnnh/atom";

const styles = {
    pageList: css`
        width: 100%;
        display: flex;
        justify-content: flex-start;
        margin: 0 auto;
        padding: 0;
        list-style: none;
        padding: 0 16px 0 16px;
    `,
    pageContent: css`
        margin: 0.5rem;
    `,
    pageItem: css`
        padding: 8px;
        margin-right: 4px;
        min-width: 16px;
        text-decoration: none;
        text-align: center;
        color: #000000;
        width: 32px;
        height: 32px;
    `,
    pageItemActive: css`
        background-color: rgba(42, 142, 224, 0.84);
        color: #FFFFFF;
        display: inline-block;
        min-width: 16px;
        text-decoration: none;
        width: 32px;
        text-align: center;
        color: #FFFFFF;
    `,
}

export function PaginationPartial(props: { pagination: FullPagination, calcUrl: (page: number) => string }) {
    const pagination = props.pagination
    return <div className={styles.pageList}>
        <div className={styles.pageContent}>
            {pagination.previousPage >= 1
                ? (<a href={props.calcUrl(pagination.previousPage)}
                      className={styles.pageItem}>上一页</a>)
                : (<></>)}
            {[...Array(pagination.endPage - pagination.startPage + 1).keys()].map((_, index) => {
                return <a key={`page-${index}`} href={props.calcUrl(pagination.startPage + index)}
                          className={pagination.currentPage === pagination.startPage + index
                              ? styles.pageItemActive
                              : styles.pageItem}>{pagination.startPage + index}</a>
            })}
            {pagination.nextPage <= pagination.maxPage
                ? (<a href={props.calcUrl(pagination.nextPage)}
                      className={styles.pageItem}>下一页</a>)
                : (<></>)}
        </div>
    </div>
}
