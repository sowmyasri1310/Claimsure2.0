from fastapi import APIRouter, HTTPException
from models.database import LOCAL_USER_ID, get_user_cases, delete_dispute_case

router = APIRouter()

@router.get("/dashboard/cases")
async def fetch_cases():
    """
    Retrieves all saved medical claim dispute analysis cases.
    """
    try:
        cases = await get_user_cases(LOCAL_USER_ID)
        return cases
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"An error occurred while fetching case history: {str(e)}"
        )

@router.delete("/dashboard/cases/{case_id}")
async def delete_case(case_id: str):
    """
    Deletes a specific saved dispute case.
    """
    try:
        success = await delete_dispute_case(case_id, LOCAL_USER_ID)
        if not success:
            raise HTTPException(
                status_code=404, 
                detail="Case not found."
            )
        return {"message": "Case successfully deleted."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while deleting the case: {str(e)}"
        )
